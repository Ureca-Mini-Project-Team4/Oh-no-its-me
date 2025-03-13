package com.uplus.eureka.user.model.dao;

import org.apache.ibatis.annotations.Mapper;
import com.uplus.eureka.user.model.dto.User;

@Mapper
public interface UserDao {
	User get(String userId); // ID로 사용자 조회
	void signup(User user);     // 신규 사용자 등록
}