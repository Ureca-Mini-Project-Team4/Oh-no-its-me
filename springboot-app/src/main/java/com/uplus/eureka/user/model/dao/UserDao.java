package com.uplus.eureka.user.model.dao;

import org.apache.ibatis.annotations.Mapper;
import com.uplus.eureka.user.model.dto.User;

@Mapper
public interface UserDao {
	User getUser(Integer userId);
	void updatePassword(Integer userId, String newPassword); // 비밀번호 변경
	User getUserByUsername(String username);
}