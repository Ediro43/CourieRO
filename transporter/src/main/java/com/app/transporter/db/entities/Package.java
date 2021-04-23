package com.app.transporter.db.entities;

public class Package {
	
	public Integer id;
	
	public String title;
	
	public Integer cid;
	
	public String email;
	
	public String state;

	public Package() {
		id = cid =  -1;
		title = email = state = "";
	}

	public Package(Integer id, String title, Integer cid, Integer uid) {
		this.id = id;
		this.title = title;
		this.cid = cid;
	}


	
}
