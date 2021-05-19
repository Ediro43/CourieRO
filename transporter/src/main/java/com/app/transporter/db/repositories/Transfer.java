package com.app.transporter.db.repositories;

import java.util.List;

public interface Transfer<T> {

	public final static String EMPTY_JSON = "{ }";
	public final static String SUCCESS = "{\"status\":\"success\"}";
	public final static String FAILURE = "{\"status\":\"failure\"}";

	String toJSON(T t);
	
	String listToJSON(List<? extends T> list);

	T fromJSON(String s);
}