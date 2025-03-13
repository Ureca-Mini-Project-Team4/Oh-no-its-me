package com.uplus.eureka.user.model.dto;

import com.uplus.eureka.EurekaException;

public class UserException extends EurekaException {
	public UserException(String msg) {
		super(msg);
	}
}
