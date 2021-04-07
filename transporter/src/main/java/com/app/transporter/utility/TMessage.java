package com.app.transporter.utility;

public class TMessage {
	
	//Should be the domain + host
	public String fullAddress;

	public String body;

	public boolean updateNodes;
	
	public TMessage() {
		fullAddress = "";
		body = "";
		updateNodes = false;
	}

	public TMessage(String fullAddress, String body, boolean updateNodes) {
		super();
		this.fullAddress = fullAddress;
		this.body = body;
		this.updateNodes = updateNodes;
	}
	
}
