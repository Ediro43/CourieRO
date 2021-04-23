package com.app.transporter.db.dtos;

public class PackageDTO {
	public Integer id;
	public String title;
	public String courier_name;
	public String email;
	public String state;

	public PackageDTO() {
		id = -1;
		title = courier_name = email = state =  "";
	}

	public PackageDTO(Integer id, String title, String courier_name, String email, String state) {
		this.id = id;
		this.title = title;
		this.courier_name = courier_name;
		this.email = email;
		this.state = state;
	}
	
	

}
