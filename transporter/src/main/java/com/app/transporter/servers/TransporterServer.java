package com.app.transporter.servers;


import java.util.function.Supplier;

import com.app.transporter.db.repositories.UserRepository;
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

//TODO: add serverInfo into constructor
//TODO: constant the dispatcher address
public class TransporterServer extends AllDirectives {
	
	@Inject private UserRepository userRepo;
	
	
	public ActorSystem<Void> system;
	public ServerInfo serverInfo = new ServerInfo("localhost", "8090", 10, 10);

	public TransporterServer(ActorSystem<Void> system) {
		this.system = system;
	}

	public Route routeTree() {
		return concat(
					path("register", () -> complete("Registration was completed")),
					
					path("transporters", getTransporters),
					
					path("auth",register()),

					path("login", login()),
					
					
					get(treatGET()),
					
					post(treatPOST()),
					
					put(treatPUT())
				);
		
				
				
	}

	private Supplier<Route> register() {
		// TODO Auto-generated method stub
		return null;
	}

	private Supplier<Route> login() {
		// TODO Auto-generated method stub
		return null;
	}

	private Supplier<Route> treatPOST() {
		return null;
	}

	private Supplier<Route> treatPUT() {
		return null;
	}

	private Supplier<Route> treatGET() {
		return () -> concat(
				path("transporters",() -> complete("yesSir"))
				);
	}
	
	
	Supplier<Route> getTransporters = () -> {
		TMessage tm = new TMessage("ana", "are", true);
		return complete(StatusCodes.OK, tm, Jackson.<TMessage>marshaller());
	};

	public void registerServerToDispatcher() {
		String hardcoded = "http://localhost:8080/register";
		Query serverInfoQuery = Query.create(serverInfo.resistrationQuerry());
		Uri dispatcherURI = Uri.create(hardcoded).query(serverInfoQuery);
		HttpRequest request = HttpRequest.create(dispatcherURI.toString());
		Http.get(system).singleRequest(request);
	}

}
