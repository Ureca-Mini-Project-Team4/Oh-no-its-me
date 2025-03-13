package com.uplus.eureka.user.model.dto;

public class LoginRequest {

	private String userId;
	private String password;

	// 기본 생성자
	public LoginRequest() {}

	// Getters and Setters
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
