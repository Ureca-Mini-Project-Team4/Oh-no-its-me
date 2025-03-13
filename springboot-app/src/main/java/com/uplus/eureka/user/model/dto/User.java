package com.uplus.eureka.user.model.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;

public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Schema(description = "사용자 아이디", example = "user123")
	private String userId; // Primary Key

	@Schema(description = "사용자 이름", example = "eurekauplus")
	private String username; // Unique

	@Schema(description = "비밀번호", example = "encrypted_password")
	private String password;

	@Schema(description = "프로필 이미지 경로", example = "/images/profile/user123.jpg")
	private String img;

	@Schema(description = "뽑힌 유무", example = "false")
	private boolean isSelected;

	@Schema(description = "랜덤 닉네임", example = "Nickname123")
	private String randomNickname;

	public User() {}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public boolean isSelected() {
		return isSelected;
	}

	public void setSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}

	public String getRandomNickname() {
		return randomNickname;
	}

	public void setRandomNickname(String randomNickname) {
		this.randomNickname = randomNickname;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username + ", password=" + password +
				", img=" + img + ", isSelected=" + isSelected + ", randomNickname=" + randomNickname + "]";
	}
}