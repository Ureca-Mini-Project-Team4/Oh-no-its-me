package com.uplus.eureka.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
			throw new IllegalArgumentException("UserDao cannot be null");
		}
		this.dao = dao;
	}

	public User login(String userId, String pass) {
		User user = dao.get(userId);
		if (user == null) {
			throw new UserException("등록되지 않은 아이디입니다.");
		}

		if (user.getPassword() == null || !user.getPassword().equals(pass)) {
			throw new UserException("비밀번호가 올바르지 않습니다.");
		}

		return user;
	}

	@Override
	public User get(String userId) {
		User user = dao.get(userId);
		if (user == null) {
			throw new UserException("등록되지 않은 아이디입니다.");
		}
		return user;
	}

	public void signup(User user) throws UserException {
		// 아이디 중복 체크
		User existingUser = dao.get(user.getUserId());
		if (existingUser != null) {
			throw new UserException("이미 사용 중인 아이디입니다.");
		}

		// 비밀번호 암호화
		String encryptedPassword = encryptPassword(user.getPassword());
		user.setPassword(encryptedPassword);

		dao.signup(user);
	}

	// 비밀번호 암호화 메서드
	private String encryptPassword(String password) {
		// BCryptPasswordEncoder 사용 (Spring Security)
		return new BCryptPasswordEncoder().encode(password);
	}
}
