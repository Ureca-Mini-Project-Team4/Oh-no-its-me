package com.uplus.eureka.user.model.service;

import com.uplus.eureka.user.model.dto.User;

public interface UserService {
	User login(String username, String pass);
	User getUser(Integer userId);
	void updatePassword(Integer userId, String new_pass);
}

