package com.uplus.eureka.user.controller;

import com.uplus.eureka.user.model.dto.TokenResponse;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.service.UserService;
import com.uplus.eureka.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "Token Management API", description = "토큰 관리 API")
@RestController
@RequestMapping("api/token")
@Slf4j
public class TokenController {

	private final JwtUtil jwtUtil;
	private final UserService userService;

	@Autowired
	public TokenController(JwtUtil jwtUtil, UserService userService) {
		this.jwtUtil = jwtUtil;
		this.userService = userService;
	}

	@Operation(
			summary = "토큰 검증",
			description = "현재 AccessToken의 유효성을 검증합니다.",
			security = @SecurityRequirement(name = "Bearer Authentication")
	)
	@ApiResponse(responseCode = "200", description = "유효한 토큰")
	@ApiResponse(responseCode = "401", description = "유효하지 않은 토큰")
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken(
			@RequestHeader("Authorization") String authHeader,
			@RequestAttribute(name = "userId", required = false) Integer userId,
			@RequestAttribute(name = "username", required = false) String username) {

		try {
			if (userId == null || username == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
			}

			Map<String, Object> response = new HashMap<>();
			response.put("valid", true);
			response.put("userId", userId);
			response.put("username", username);

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
		}
	}

	@Operation(
			summary = "토큰 갱신",
			description = "Refresh Token을 사용해 Access Token을 갱신합니다."
	)
	@ApiResponse(responseCode = "200", description = "토큰 갱신 성공")
	@ApiResponse(responseCode = "401", description = "유효하지 않은 Refresh Token")
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(
			@Parameter(description = "Refresh Token", required = true, in = ParameterIn.HEADER)
			@RequestHeader("Refresh-Token") String refreshToken) {

		try {
			String newAccessToken = jwtUtil.generateAccessTokenFromRefreshToken(refreshToken);

			if (newAccessToken == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 Refresh Token입니다.");
			}

			TokenResponse tokenResponse = new TokenResponse();
			tokenResponse.setAccessToken("Bearer " + newAccessToken);

			return ResponseEntity
					.ok()
					.header("Authorization", "Bearer " + newAccessToken)
					.body(tokenResponse);
		} catch (Exception e) {
			log.error("토큰 갱신 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 Refresh Token입니다.");
		}
	}

	@Operation(
			summary = "로그아웃",
			description = "사용자의 Refresh Token을 무효화합니다.",
			security = @SecurityRequirement(name = "Bearer Authentication")
	)
	@ApiResponse(responseCode = "200", description = "로그아웃 성공")
	@ApiResponse(responseCode = "401", description = "인증 실패")
	@PostMapping("/logout")
	public ResponseEntity<?> logout(
			@RequestAttribute(name = "userId", required = false) Integer userId) {

		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증이 필요합니다.");
		}

		try {
			userService.deleteRefreshToken(userId);
			return ResponseEntity.ok("로그아웃 성공");
		} catch (Exception e) {
			log.error("로그아웃 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그아웃 실패");
		}
	}
}