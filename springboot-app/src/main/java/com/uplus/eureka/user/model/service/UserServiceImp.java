package com.uplus.eureka.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uplus.eureka.user.model.dao.UserDao;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.dto.UserException;

@Service
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
	public void updatePassword(Integer userId, String newPassword) throws UserException {
		User user = dao.getUser(userId);
		if (user == null) {
			throw new UserException("등록되지 않은 아이디입니다.");
		}

		// 비밀번호 비교 로직
		if (newPassword.equals(user.getPassword())) {
			throw new UserException("현재 비밀번호와 동일합니다.");
		}

		dao.updatePassword(userId, newPassword); // 데이터베이스에 새 비밀번호 저장
	}


}
