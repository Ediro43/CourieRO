package com.app.transporter.db.repositories;

public interface Transfer<T> {
	
	String unmarshall(T t);

	T marshall(String s);
}