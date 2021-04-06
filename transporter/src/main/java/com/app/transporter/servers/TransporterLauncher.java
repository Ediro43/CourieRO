package com.app.transporter.servers;

import com.app.transporter.utility.DBBinder;
import com.google.inject.Guice;
import com.google.inject.Injector;

import akka.actor.typed.ActorSystem;
import akka.actor.typed.javadsl.Behaviors;
import akka.http.javadsl.Http;
import akka.http.javadsl.server.AllDirectives;

/**
 * Hello world!
 *
 */
public class TransporterLauncher extends AllDirectives {


	public static void main(String[] args) throws Exception {
		Injector injector = Guice.createInjector(new DBBinder());
		ActorSystem<Void> system = ActorSystem.create(Behaviors.empty(), "routes");
		final Http http = Http.get(system);
		TransporterServer transporterServer = new TransporterServer(system);
		injector.injectMembers(transporterServer);
		http.newServerAt("localhost", 8090).bind(transporterServer.routeTree());
		transporterServer.registerServerToDispatcher();
	}

}
