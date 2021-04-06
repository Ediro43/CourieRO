package com.app.transporter.utility;

import org.dalesbred.Database;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.transporter.db.repositories.UserRepository;
import com.google.inject.AbstractModule;

public class DBBinder extends AbstractModule {
	final Logger logger = LoggerFactory.getLogger(DBBinder.class);
	
	@Override
	protected void configure() {
		Database db = Database.forUrlAndCredentials("jdbc:mysql://localhost:3306/firstdb", "abcuser", "abcpassword");
		logger.info("DB connection has been established");
		bind(UserRepository.class).toInstance(new UserRepository(db));
	}

}
