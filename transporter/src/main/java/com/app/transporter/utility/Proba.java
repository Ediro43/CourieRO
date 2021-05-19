package com.app.transporter.utility;

import com.app.transporter.db.entities.Package;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Proba {

	public static void main(String[] args) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String lala = objectMapper.writeValueAsString(new Package(1, "sad", 3, "sadasd", "asdad"));
		String lala2 = objectMapper.writeValueAsString(null);
		System.out.println(lala2);
	}

}
