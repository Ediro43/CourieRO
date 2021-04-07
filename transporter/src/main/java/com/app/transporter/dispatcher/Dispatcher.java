package com.app.transporter.dispatcher;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletionStage;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import com.app.transporter.utility.ServerInfo;
import com.app.transporter.utility.TMessage;

import akka.actor.typed.ActorSystem;
import akka.http.javadsl.Http;
import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.ContentTypes;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.Query;
import akka.http.javadsl.model.Uri;
import akka.http.javadsl.server.AllDirectives;
import akka.japi.function.Function;

/**
 * Requests controller. Responsibilities:
 * <br>Cache existing servers.
 * <br>Forwards requests to the nearest server based on longitude and latitude.
 * <br>Decides based on the received message if the request should be passed to the remaining servers for synchronizations.
 * @author Victor
 *
 */
public class Dispatcher extends AllDirectives {
	

	private final ActorSystem<Void> system;
	
	//        'host:port' -> value
	private Map<String, ServerInfo> availableServers = new HashMap<>();

	public Dispatcher(ActorSystem<Void> system) {
		this.system = system;
	}

	/**
	 * Dispatch handler. <br>
	 * /register - server registration
	 * <br>Rest of requests are forwarded to closest server.
	 * <br>The closest server will respond with the answer and the dispatcher is responsible for returning the JSON information to client.
	 * <br>POST requests are also forwarded to 
	 * @return
	 */
	public Function<HttpRequest, CompletionStage<HttpResponse>> getDispatcherHandler() {
		return request -> {
			Uri uri = request.getUri();
			String queryPath = uri.getPathString();
			if (queryPath.contains("/register")) {
				registerServer(uri);
				return null;
			}
			ServerInfo closestServer = getNearestServer();
			final String link = closestServer.getRequestLink(queryPath);
			HttpRequest requestToServer = HttpRequest.create(link);
			
			//Forward the request to the closest server and get the rough response TMessage.
			var roughResponse = Http.get(system).singleRequest(requestToServer);
			
			//Filter the response for client by extracting the 'body' from the TMessage.
			//Steps: 1. unmarshal the response into a future message
			//       2. return to the client just the body of the available message
			var filteredResponse = roughResponse.thenCompose(it -> {
				var ftMessage = Jackson.unmarshaller(TMessage.class).unmarshal(it.entity(), system);
				return ftMessage.thenApply(mess -> HttpResponse.create().withEntity(ContentTypes.APPLICATION_JSON, mess.body));
			});
			
			//Create update requests for the rest of the available servers.
			var restOfServers = availableServers.values()
					.stream()
					.filter(svr -> svr.compareServerInfo(closestServer))
					.collect(Collectors.toList());
			if(restOfServers.size() > 0) {
				roughResponse.thenAccept(syncronizeServers(queryPath,restOfServers));
			};
			
			return filteredResponse;
		};
	}
	
	public Consumer<HttpResponse> syncronizeServers(String requestPath, List<ServerInfo> restOfServers) {
		return response -> {
			CompletionStage<TMessage> partialMessage = Jackson.unmarshaller(TMessage.class).unmarshal(response.entity(), system);
			partialMessage.thenAccept(exportMessage(requestPath,restOfServers));
			
		};
	}
	
	Consumer<TMessage> exportMessage(String requestPath, List<ServerInfo> restOfServers) {
		return message -> {
			boolean informServers = message.updateNodes;
			if (informServers) {
				for (var server : restOfServers) {
					final String link = server.getRequestLink(requestPath);
					HttpRequest requestToServer = HttpRequest.PUT(link);
					Http.get(system).singleRequest(requestToServer);
				}
			}
		};
	}

	// TODO: cache maybe the client and also the location
	private ServerInfo getNearestServer() {
		return availableServers.values().stream().findFirst().get();
	}

	public void registerServer(Uri uri) {
		Query query = uri.query();
		String host = query.getOrElse("host", "");
		String port = query.getOrElse("port", "");
		String address = host + ":" + port;
		if (!availableServers.containsKey(address)) {
			Long longitude = Long.parseLong(query.getOrElse("longitude", "0"));
			Long latitude = Long.parseLong(query.getOrElse("latitude", "0"));
			ServerInfo server = new ServerInfo(host, port, longitude, latitude);
			availableServers.put(address, server);
		}
	}

}
