package com.uplus.eureka.user.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uplus.eureka.user.model.dao.UserDao;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.dto.UserException;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImp implements UserService {

	private final UserDao dao;

	@Autowired
	public UserServiceImp(UserDao dao) {
		if (dao == null) {
			throw new IllegalArgumentException("UserDao는 null이 될 수 없습니다.");
		}
		this.dao = dao;
	}

	public User login(String username, String pass) throws UserException {
		User user = dao.getUserByUsername(username); // 사용자 이름으로 사용자 조회
		if (user == null) {
			throw new UserException("등록되지 않은 아이디입니다.");
		}

		// 비밀번호 비교
		if (!pass.equals(user.getPassword())) {
			throw new UserException("비밀번호가 올바르지 않습니다.");
		}
		return user;
	}

	@Override
	public User getUser(Integer userId) throws UserException  {
		User user = dao.getUser(userId);
		if (user == null) {
			throw new UserException("등록되지 않은 아이디입니다.");
		}
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		User user = dao.getUserByUsername(username);
		if (user == null) {
			throw new UserException("등록되지 않은 사용자입니다.");
		}
		return user;
	}


	@Override
	public void updatePassword(String username, String newPassword) throws UserException {
		User user = dao.getUserByUsername(username);
		if (user == null) {
			throw new UserException("등록되지 않은 사용자입니다.");
		}

		// 비밀번호 비교 로직
		if (newPassword.equals(user.getPassword())) {
			throw new UserException("현재 비밀번호와 동일합니다.");
		}

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("username", username);
		paramMap.put("password", newPassword);
		dao.updatePassword(paramMap);
	}

	@Override
	public void saveRefreshToken(Integer userId, String refreshToken) {
		Map<String, Object> map = new HashMap<>();
		map.put("userId", userId);
		map.put("token", refreshToken);
		dao.saveRefreshToken(map);
	}

	@Override
	public String getRefreshToken(Integer userId) {
		return dao.getRefreshToken(userId.toString());
	}

	@Override
	public void deleteRefreshToken(Integer userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("userId", userId);
		map.put("token", null);
		dao.deleteRefreshToken(map);
	}
}