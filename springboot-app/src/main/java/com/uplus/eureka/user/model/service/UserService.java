package com.uplus.eureka.user.model.service;

import com.uplus.eureka.user.model.dto.User;

public interface UserService {
	User login(String username, String pass);
	User getUser(Integer userId);
	User getUserByUsername(String username);
	void updatePassword(String username, String new_pass);
	void saveRefreshToken(Integer userId, String refreshToken);
	String getRefreshToken(Integer userId);
	void deleteRefreshToken(Integer userId);
}