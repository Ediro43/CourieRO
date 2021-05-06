package com.app.transporter.db.dtos;

public class PackageDTO {
	public Integer id;
	public String title;
	public String courier_name;
	public Integer courier_id;
	public String email;
	public String state;

	public PackageDTO() {
		id = courier_id = -1;
		title = courier_name = email = state =  "";
	}

	public PackageDTO(Integer id, String title, String courier_name, Integer courier_id, String email, String state) {
		this.id = id;
		this.title = title;
		this.courier_name = courier_name;
		this.courier_id = courier_id;
		this.email = email;
		this.state = state;
	}

	
	

}
