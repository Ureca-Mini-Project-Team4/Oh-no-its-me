

package com.uplus.eureka.user.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.uplus.eureka.user.model.dto.User;

@Mapper
public interface UserDao {
	User getUser(Integer userId);
	void updatePassword(Map<String, Object> paramMap);
	User getUserByUsername(String username);
	void saveRefreshToken(Map<String, Object> map);
	String getRefreshToken(String userId);
	void deleteRefreshToken(Map<String, Object> map);
}