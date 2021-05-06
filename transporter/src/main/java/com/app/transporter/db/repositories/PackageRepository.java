package com.app.transporter.db.repositories;

import java.util.List;
import java.util.Optional;

import org.dalesbred.Database;

import com.app.transporter.db.dtos.PackageDTO;
import com.app.transporter.db.entities.Package;
import com.fasterxml.jackson.core.JsonProcessingException;

import akka.http.javadsl.marshallers.jackson.Jackson;
import akka.http.javadsl.model.HttpEntity;
import akka.http.javadsl.unmarshalling.Unmarshaller;


public class PackageRepository extends Repository<Package>{

	public static final Unmarshaller<HttpEntity, Package> unmarshaller = Jackson.unmarshaller(Package.class);
	
	public PackageRepository(Database db, String entityName) {
		super(db, entityName);
	}

	@Override
	public Package fromJSON(String s) {
		try {
			return objectMapper.readValue(s, Package.class);
		} catch (Exception e) {
			return new Package();
		}
	}

	@Override
	public List<? extends Package> findAll() {
		//TODO: retrieve all packages
		return null;
	}

	@Override
	public Optional<? extends Package> searchById(Integer id) {
		//TODO: self explanatory
		return null;
	}
	
	@Override
	public String save(Package pack) {
		//TODO: save package to db
		return "Succes";
	}
	
	public String edit(Package pack) {
		//TODO: modify a pack
		return "Succes";
	}
	
	public void delete(Integer id) {
		//TODO: delete a package
	}
	

	public String getCustomInfoAboutPackages() {
		String query = "select p.id id, p.title title, c.name courier_name,p.cid courier_id, p.email email, p.state state from package p, courier c where c.id = p.cid";
		var packages = getDataBase().findAll(PackageDTO.class, query);
		try {
			return objectMapper.writeValueAsString(packages);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return EMPTY_JSON;
		}
	}
	
	//Used for sync. DBs
	@Override
	public void insertAll(List<Package> packages) {
		for (var pack : packages) {
			getDataBase().update("insert ignore into package (id, title, cid, email, state) values (?, ?, ?, ?, ?)", pack.id, pack.title, pack.cid, pack.email, pack.state);
		}
	}
}
