package com.app.transporter.servers;


import static akka.http.javadsl.server.PathMatchers.integerSegment;
import static akka.http.javadsl.server.PathMatchers.segment;

import java.util.concurrent.CompletionStage;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

import com.app.transporter.db.entities.Courier;
import com.app.transporter.db.entities.Package;
import com.app.transporter.db.repositories.CourierRepository;
import com.app.transporter.db.repositories.PackageRepository;
import com.app.transporter.db.repositories.UniversalRepository;
import com.app.transporter.utility.ServerInfo;
import com.app.transporter.utility.TMessage;
import com.google.inject.Inject;

import akka.actor.typed.ActorSystem;
import akka.http.javadsl.Http;
import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.Query;
import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.model.Uri;
import akka.http.javadsl.server.AllDirectives;
import akka.http.javadsl.server.Route;
import akka.http.javadsl.unmarshalling.StringUnmarshallers;
import static com.app.transporter.db.repositories.Transfer.*;

//TODO: constant the dispatcher address
public class TransporterServer extends AllDirectives {
	
	@Inject private UniversalRepository universalRepo;
	@Inject private CourierRepository courierRepo;
	@Inject private PackageRepository packageRepo;
	
	//Server consumables
	public ActorSystem<Void> system;
	public ServerInfo serverInfo;
	
	public TransporterServer(ActorSystem<Void> system, ServerInfo serverInfo) {
		this.system = system;
		this.serverInfo = serverInfo;
	}
	
	public Route routeTree() {
		return 
		concat(

				path("dbSchema", retriveAllSchema),

				path("login", LOGIN()),

				get(GET()),

				post(POST()),

				delete(DELETE()),

				put(PUT()),
				
				options(OPTIONS())

		);

	}
	
	private Supplier<Route> LOGIN() {
		return () -> parameter("username", username ->
				     parameter("password", password -> login(username, password)));
	}
	
	private Supplier<Route> POST() {
		return update(true);
	}
	
	private Supplier<Route> PUT() {
		return update(false);
	}
	
	private Supplier<Route> OPTIONS() {
		return update(true);
	}
	
	
	private Supplier<Route> DELETE() { 
		return () -> path(segment("packages").slash(integerSegment()), deletePackage(true));	
	}
	
	private Supplier<Route> GET() {
		return () -> concat(
				path("packages", 	getPackageByID),
				path("packages", 	getAllPackagesOfACourier),
				path("packages", 	getPackages),
				path("viewpackage", getPackageByID),
				path("couriers", 	getCourierByID),
				path("couriers", 	getCouriers)
				);
	}
	
	private Supplier<Route> update(boolean statusMessage) {
		return () -> concat(path("auth", () -> entity(CourierRepository.unmarshaller, register(statusMessage))),
				
				
				path("changestate", 
						() -> parameter("id", id -> 
							  parameter("state", state -> editStateOfPackage(Integer.parseInt(id), state, statusMessage)))),
				
				path("packages",
						() -> parameter("title",
								title -> parameter("cid", 
								cid -> parameter("email", 
								email -> parameter("state",
							    state -> savePackage(statusMessage,
												new Package(null, title, Integer.parseInt(cid), email, state))))))),
				
				path(segment("packages").slash(integerSegment()), deletePackage(statusMessage)),
				
				path("editpackages",
						() -> parameter("id", id -> parameter("title",
								title -> parameter("cid", 
								cid -> parameter("email", 
								email -> parameter("state",
							    state -> editPackage(statusMessage,
												new Package(Integer.parseInt(id), title, Integer.parseInt(cid), email, state))))))))
				);
	}
	
	
	
	// Couriers
	private Route login(String username, String password) {
		TMessage message = new TMessage(serverInfo.getDomainAddress(), "", false);
		Courier courier = courierRepo.searchByUsernameAndPassword(username, password).orElse(null);
		if (courier != null) {
			message.body = courierRepo.toJSON(courier);
		} else {
			message.body = FAILURE;
		}
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	}
	
	private Function<Courier, Route> register(boolean updateStatus) {
		return courier -> {
			courierRepo.save(courier);
			TMessage message = new TMessage(serverInfo.getDomainAddress(), courierRepo.toJSON(courier), updateStatus);
			return complete(StatusCodes.OK, message, Jackson.marshaller());
		};
	}
	
	private Supplier<Route> getCouriers = () -> {
		String couriers = courierRepo.findJustCouriers();
		TMessage tm = new TMessage(serverInfo.getDomainAddress(), couriers, false);
		return complete(StatusCodes.OK, tm, Jackson.<TMessage>marshaller());
	};

	private Supplier<Route> getCourierByID = () -> parameter(StringUnmarshallers.INTEGER, "id", id -> {
		var courier = courierRepo.searchById(id).get();
		TMessage message = new TMessage(serverInfo.getDomainAddress(), courierRepo.toJSON(courier), false);
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	});
	
	
	// Packages
	private Route savePackage(boolean updateStatus, Package pack) {
			packageRepo.save(pack);
			TMessage message = new TMessage(serverInfo.getDomainAddress(), SUCCESS, updateStatus);
			return complete(StatusCodes.OK, message, Jackson.marshaller());
	}
	
	private Route editPackage(boolean updateStatus, Package pack) {
		packageRepo.edit(pack);
		TMessage message = new TMessage(serverInfo.getDomainAddress(), SUCCESS, updateStatus);
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	}
	
	private Route editStateOfPackage(Integer id, String state, boolean updateStatus) {
		packageRepo.editStateOfThePackage(id, state);
		TMessage message = new TMessage(serverInfo.getDomainAddress(), SUCCESS, updateStatus);
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	}
	
	private Supplier<Route> getPackages = () -> {
		String packages = packageRepo.getCustomInfoAboutPackages();
		TMessage tm = new TMessage(serverInfo.getDomainAddress(), packages, false);
		return complete(StatusCodes.OK, tm, Jackson.<TMessage>marshaller());
	};
	
	private Supplier<Route> getPackageByID = () -> parameter("id", id -> {
		var pack = packageRepo.searchById(Integer.parseInt(id)).get();
		TMessage message = new TMessage(serverInfo.getDomainAddress(), packageRepo.toJSON(pack), false);
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	});
	
	private Supplier<Route> getAllPackagesOfACourier = () -> parameter("cid", cid -> {
		var packages = packageRepo.findAllPackagesOfAGivenCourier(Integer.parseInt(cid));
		TMessage message = new TMessage(serverInfo.getDomainAddress(), packages, false);
		return complete(StatusCodes.OK, message, Jackson.marshaller());
	});
	
	private Function<Integer, Route> deletePackage(boolean statusMessage) {
		return id -> {
			packageRepo.delete(id);
			TMessage message = new TMessage(serverInfo.getDomainAddress(), SUCCESS, statusMessage);
			return complete(StatusCodes.OK, message, Jackson.marshaller());
		};
	}
	
	//Server registration
	private Consumer<TMessage> syncServer() {
		return message -> {
			universalRepo.insertAllDBSchema(message.body);
		};
	}
	
	Supplier<Route> retriveAllSchema = () -> {
		String dbSchema = universalRepo.createDBSchema();
		TMessage tm = new TMessage(serverInfo.getDomainAddress(), dbSchema, true);
		return complete(StatusCodes.OK, tm, Jackson.<TMessage>marshaller());
	};

	//TODO: display a message when the registration is done in the dispatcher and after that here
	/**
	 * Creates an request to the dispatcher
	 */
	public void registerServerToDispatcher() {
		String hardcoded = "http://localhost:8080/register";
		Query serverInfoQuery = Query.create(serverInfo.resistrationQuerry());
		Uri dispatcherURI = Uri.create(hardcoded).query(serverInfoQuery);
		HttpRequest request = HttpRequest.create(dispatcherURI.toString());
		Http.get(system).singleRequest(request).thenAccept(response -> {
			CompletionStage<TMessage> unmarshal = Jackson.unmarshaller(TMessage.class).unmarshal(response.entity(), system);
			unmarshal.thenAccept(syncServer());
		});
	}

}
