package com.uplus.eureka.user.model.service;

import com.uplus.eureka.user.model.dto.User;

public interface UserService {
	User login(String userId, String pass);
	User get(String userId);
	void signup(User user);

}

