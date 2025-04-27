package com.uplus.eureka.user.model.dto;

public class UnAuthorizedException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UnAuthorizedException() {
		super("권한이 없습니다.");
	}

	public UnAuthorizedException(String message) {
		super(message);
	}
}