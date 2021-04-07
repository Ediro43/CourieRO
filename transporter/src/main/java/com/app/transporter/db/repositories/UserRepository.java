package com.app.transporter.db.repositories;

import java.util.List;
import java.util.Optional;

import org.dalesbred.Database;

import com.app.transporter.db.entities.User;

//TODO: change the Entity 
public class UserRepository extends Repository<User> {

	
	public UserRepository(Database db) {
		super(db);
	}

	@Override
	public String unmarshall(User t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User marshall(String s) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	List<? extends User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	Optional<? extends User> searchById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
