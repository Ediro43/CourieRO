package com.app.transporter.db.repositories;

import java.util.List;
import java.util.Optional;

import org.dalesbred.Database;

import com.app.transporter.db.entities.Courier;

import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.HttpEntity;
import akka.http.javadsl.unmarshalling.Unmarshaller;

public class CourierRepository extends Repository<Courier> {

	public static final Unmarshaller<HttpEntity, Courier> unmarshaller = Jackson.unmarshaller(Courier.class);

	public CourierRepository(Database db, String entityName) {
		super(db, entityName);
	}

	@Override
	public Courier fromJSON(String s) {
		try {
			return objectMapper.readValue(s, Courier.class);
		} catch (Exception e) {
			return new Courier();
		}
	}

	@Override
	public List<? extends Courier> findAll() {
		return getDataBase().findAll(Courier.class, "select * from courier");
	}
	
	public List<? extends Courier> findJustCouriers() {
		//TODO: just courier role from the db
		return null;
	}

	@Override
	public Optional<? extends Courier> searchById(Integer id) {
		//TODO: search by id the courier
		return null;
	}
	
	public Optional<? extends Courier> searchByUsernameAndPassword(String name, String password) {
		//TODO: as above but by name and password
		return null;
	}

	@Override
	public String save(Courier courier) {
		//TODO: insert the courier into db: check dalesbred docu: use this getDataBase().update();
		return "Succes";
	}
	
	//Used for sync. DBs
	@Override
	void insertAll(List<Courier> couriers) {
		for (var courier : couriers) {
			getDataBase().update("insert ignore into courier (id, name, password, role) values (?, ?, ?, ?)",courier.id, courier.name, courier.password, courier.role);
		}
	}
	

}
