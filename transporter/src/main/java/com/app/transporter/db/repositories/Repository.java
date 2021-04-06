package com.app.transporter.db.repositories;

import java.util.List;
import java.util.Optional;

import org.dalesbred.Database;

public abstract class Repository<T> implements Transfer<T> {
	
	private Database dataBase;

	public Repository(Database db) {
		this.dataBase = db;
	}

	public Database getDataBase() {
		return dataBase;
	}
	
	
	abstract List<? extends T> findAll();
	
	abstract Optional<? extends T> searchById(Integer id);
}
