package com.app.transporter.db.entities;

public class Courier {
	
	public Integer id;
	public String name;
	public String password;
	public String role;

	public Courier() {
		id = 0;
		name = "";
		password = "";
		role = "";
	}

	public Courier(String name, String password, String role) {
		super();
		this.name = name;
		this.password = password;
		this.role = role;
	}

}
