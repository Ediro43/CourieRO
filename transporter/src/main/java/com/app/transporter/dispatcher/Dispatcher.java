package com.app.transporter.dispatcher;

import static java.lang.Long.parseLong;
import static java.lang.Double.parseDouble;
import static java.util.concurrent.CompletableFuture.runAsync;
import static java.util.stream.Collectors.toList;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.CompletionStage;

import com.app.transporter.utility.ServerInfo;
import com.app.transporter.utility.TMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import akka.actor.typed.ActorSystem;
import akka.http.javadsl.Http;
import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.ContentTypes;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.Query;
import akka.http.javadsl.model.Uri;
import akka.http.javadsl.model.headers.RawHeader;
import akka.http.javadsl.server.AllDirectives;
import akka.japi.function.Function;

/**
 * <h2>Requests controller responsibilities:</h2>
 * <br>Cache existing servers. When a new server is added the dispatcher ensures that the server has the database synchronized with the rest of the servers.
 * <br>Forwards requests to the nearest server based on longitude and latitude.
 * Decides based on the received message if the request should be passed to the remaining servers for synchronization.
 * <br>A simple scenario: 
 * <br>client -> request(POST,package) -> dispatcher 
 * <br>dispatcher -> request(POST,package) -> nearest server
 * <br>nearest server -> response(POST,TMessage) -> dispatcher
 * <br>dispatcher -> response(POST,TMessage.body) -> client
 * <br>dispatcher -> request(PUT,package) -> [rest of the servers]
 * <br>The last step represents the synchronization of the servers.
 * @author Victor
 *
 */
public class Dispatcher extends AllDirectives {
	

	private final ActorSystem<Void> system;
	
	//        'host:port' -> serverInfo
	private Map<String, ServerInfo> availableServers = new LinkedHashMap<>();
	
	//        'device.hashcode' -> serverInfo
	private Map<Integer, ServerInfo> clientToServerCache = new HashMap<>();

	public Dispatcher(ActorSystem<Void> system) {
		this.system = system;
	}

	/**
	 * Dispatch handler. <br>
	 * /register - server registration
	 * <br>Rest of requests are forwarded to closest server.
	 * <br>The closest server will respond with the answer and the dispatcher is responsible for returning the JSON information to client.
	 * <br>POST requests are also forwarded to the rest of the cached servers for synchronization.
	 * @return forwards the nearest server response to the client.
	 */
	public Function<HttpRequest, CompletionStage<HttpResponse>> getDispatcherHandler() {
		return request -> {
			Uri uri = request.getUri();
			String attributes = uri.query().toString();
			String query = !attributes.isEmpty() ? "?" + attributes : "";
			String queryPath = uri.getPathString() + query;
			
			// Server registration request to dispatcher.
			if (queryPath.contains("/register")) {
				cacheServer(uri);

				// Create full synchronization of the DB for the new server.
				if (availableServers.size() > 1) {
					return syncAllDataForTheNewServer();
				}
				return null;
			}

			//Find the nearest server based on the request-device location.
			final ServerInfo closestServer = getNearestServer(request);

			//Copy request from the original with the new server address.
			final String link = closestServer.getRequestLink(queryPath);
			HttpRequest requestToServer = HttpRequest.create(link)
					.withHeaders(request.getHeaders())
					.withMethod(request.method())
					.withEntity(request.entity());
			
			//Forward the request to the closest server and get the rough response.
			var roughResponse = Http.get(system).singleRequest(requestToServer);
			
			//Filter the response for client by extracting the 'body' from the TMessage.
			//Steps: 1. transform the response into a future message (TMessage)
			//       2. return to the client just the body of the available message
			//       3. sync the rest of the servers
			var filteredResponse = roughResponse.thenCompose(httpResponse -> {
				var message = Jackson.unmarshaller(TMessage.class).unmarshal(httpResponse.entity(), system);
				return message.thenApply(manageResponse(requestToServer,closestServer));
			});
			
			return filteredResponse;
		};
	}
	
	/**
	 * Retrieve the DBSchema with all data from queue and forward it to the new server.
	 * @return
	 */
	CompletionStage<HttpResponse> syncAllDataForTheNewServer() {
		var firstServer = availableServers.values().stream().findFirst().get();
		String link = firstServer.getRequestLink("/dbSchema");
		HttpRequest requestToServer = HttpRequest.GET(link);
		return Http.get(system).singleRequest(requestToServer).thenCompose(httpResponse -> {
			var ftMessage = Jackson.unmarshaller(TMessage.class).unmarshal(httpResponse.entity(), system);
			return ftMessage.thenApply(ms -> {
				try {
					String writeValueAsString = new ObjectMapper().writeValueAsString(ms);
					return HttpResponse.create().withEntity(ContentTypes.APPLICATION_JSON, writeValueAsString);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
				return null;
			});
		});
	}
	
	/**
	 * After receiving the JSON response from the nearest server return the 'body - response' to the client. The response has to provide <b>CORS</b> headers in order to pass browser filters.
	 * <BR>In parallel (asynchronous) the rest of the available servers gets synchronized. 
	 * @param oldRequest
	 * @param closestServer
	 * @return
	 */
	private java.util.function.Function<TMessage,HttpResponse> manageResponse(HttpRequest oldRequest, ServerInfo closestServer){
		return  messesage -> {
			runAsync(() -> synchronizeServers(messesage, oldRequest, closestServer));
			RawHeader create =  RawHeader.create("Access-Control-Allow-Origin", "http://localhost:3000");
			RawHeader create2 = RawHeader.create("Access-Control-Allow-Credentials",  "true");
			RawHeader create3 = RawHeader.create("Access-Control-Max-Age",  "1800");
			RawHeader create5 = RawHeader.create("Access-Control-Allow-Methods",  "PUT, POST, GET, DELETE, PATCH, OPTIONS");
			RawHeader create6 = RawHeader.create("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

			return HttpResponse.create().withHeaders(Arrays.asList(create,create2,create3,create5,create6)).withEntity(ContentTypes.APPLICATION_JSON, messesage.body);
		};
	}
	
	private void synchronizeServers(TMessage message, HttpRequest oldRequest, ServerInfo closestServer) {
			boolean informServers = message.updateStatus;
			if (informServers) {
				var restOfServers = availableServers.values().stream()
						.filter(svr -> !svr.compareServerInfo(closestServer))
						.collect(toList());
				
				//create PUT requests for the servers - alternatively POST can be used
				for (var server : restOfServers) {
					String queryPath = getQueryPath(oldRequest);
					String link = server.getRequestLink(queryPath);
					HttpRequest requestToServer = HttpRequest
							.PUT(link)
							.withHeaders(oldRequest.getHeaders())
							.withEntity(oldRequest.entity());
					Http.get(system).singleRequest(requestToServer);
				}
			}
	}

	
	/**
	 * TODO: For now just the login requests contains the Latitude/Longitude. In future each request might include the Latitude/Longitude.
	 * For /login requests map the device to the nearest server.
	 * <br>For the rest of the requests get the server directly from map.
	 * <br>An exception request-creator like Post-man will get the first server available since there is no device information.(No User-Agent header)
	 * @param request
	 * @return nearest server
	 */
	private ServerInfo getNearestServer(HttpRequest request) {
		String queryPath = getQueryPath(request);
		String deviceInfo = request.getHeader("User-Agent")
				.orElse(RawHeader.create("default", "default")).toString();
		if (queryPath.contains("/login")) {
			Query uriQuery = request.getUri().query();
			Double latitude = parseDouble(uriQuery.getOrElse("latitude", "0"));
			Double longitude = parseDouble(uriQuery.getOrElse("longitude", "0"));

			var servers = availableServers.values().stream().collect(toList());
			int pos = 0;
			double minDistance = Double.MAX_VALUE;
			for (int i = 0; i < servers.size(); i++) {
				var server = servers.get(i);
				double distance = distance(server.latitude, server.longitude, latitude, longitude);
				if (distance < minDistance) {
					minDistance = distance;
					pos = i;
				}
			}
			
			//map a device to nearest server: device -> serverInfo
			var nearestServer = servers.get(pos);
			clientToServerCache.put(deviceInfo.hashCode(), nearestServer);
			return nearestServer;
		}
		
		//for non-login request get the server from map
		int deviceCode = deviceInfo.hashCode();
		if (clientToServerCache.containsKey(deviceCode)) {
			return clientToServerCache.get(deviceCode);
		}
		
		return availableServers.values().stream().findFirst().get();
	}
	
	private void cacheServer(Uri uri) {
		Query query = uri.query();
		String host = query.getOrElse("host", "");
		String port = query.getOrElse("port", "");
		String address = host + ":" + port;
		if (!availableServers.containsKey(address)) {
			Long longitude = parseLong(query.getOrElse("longitude", "0"));
			Long latitude = parseLong(query.getOrElse("latitude", "0"));
			ServerInfo server = new ServerInfo(host, port, latitude, longitude);
			availableServers.put(address, server);
		}
	}
	
	
	private static String getQueryPath(HttpRequest request) {
		Uri uri = request.getUri();
		String attributes = uri.query().toString();
		String query = !attributes.isEmpty() ? "?" + attributes : "";
		return uri.getPathString() + query;
	}
	
	private static double distance(double lat1, double lon1, double lat2, double lon2) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		} else {
			double theta = lon1 - lon2;
			double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2))
					+ Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
			dist = Math.acos(dist);
			dist = Math.toDegrees(dist);
			dist = dist * 60 * 1.1515;
			return dist = dist * 1.609344;
		}
	}

}
