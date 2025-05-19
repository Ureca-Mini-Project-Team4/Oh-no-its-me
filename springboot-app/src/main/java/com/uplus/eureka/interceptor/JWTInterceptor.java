package com.uplus.eureka.interceptor;

import com.uplus.eureka.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.uplus.eureka.user.model.dto.UnAuthorizedException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTInterceptor implements HandlerInterceptor {

	private final String HEADER_AUTH = "Authorization";
	private final String REFRESH_AUTH = "Refresh-Token";

	private JwtUtil jwtUtil;

	public JWTInterceptor(JwtUtil jwtUtil) {
		super();
		this.jwtUtil = jwtUtil;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// OPTIONS 요청은 허용 (CORS preflight 요청)
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true;
		}

		String url = request.getServletPath();
		String method = request.getMethod();
		log.debug("JWTInterceptor");
		log.debug("request url:{} method:{}", url, method);

		// Swagger 및 API 문서 관련 경로는 인증 제외
		if (url.contains("/swagger") ||
				url.contains("/v3/api-docs") ||
				url.contains("/eureka/assets/")) {
			return true;
		}

		// 로그인 및 회원가입 요청은 허용
		if ((url.equals("/api/user/login") && method.equalsIgnoreCase("POST")) ||
				(url.equals("/api/user") && method.equalsIgnoreCase("POST"))) {
			return true;
		}

		// 헤더에서 토큰 추출
		String accessToken = request.getHeader(HEADER_AUTH);
		String refreshToken = request.getHeader(REFRESH_AUTH);

		log.debug("accessToken:{}", accessToken);
		log.debug("refreshToken:{}", refreshToken);

		// Access Token 검증
		if (accessToken != null) {
			accessToken = accessToken.replace("Bearer ", "");
			log.debug("HEADER_AUTH:{}", accessToken);
			if (jwtUtil.checkToken(accessToken)) {
				// 유효한 토큰이면 사용자 정보 추출하여 request 속성에 추가
				Integer userId = jwtUtil.extractUserId(accessToken);
				String username = jwtUtil.extractUsername(accessToken);

				request.setAttribute("userId", userId);
				request.setAttribute("username", username);

				log.info("Access Token 사용 가능 : {}", accessToken);
				return true;
			}
		}

		log.info("Access Token 사용 불가능, Refresh Token 검사 시작");

		// Refresh Token 검증 및 Access Token 재발급
		if (refreshToken != null) {
			String newAccessToken = jwtUtil.generateAccessTokenFromRefreshToken(refreshToken);

			if (newAccessToken != null && jwtUtil.checkToken(newAccessToken)) {
				log.info("Refresh Token 사용 가능, Access Token 갱신");
				log.info("재 발행한 access Token:{}", newAccessToken);

				// 새 액세스 토큰으로부터 사용자 정보 추출
				Integer userId = jwtUtil.extractUserId(newAccessToken);
				String username = jwtUtil.extractUsername(newAccessToken);

				// 요청에 사용자 정보 추가
				request.setAttribute("userId", userId);
				request.setAttribute("username", username);

				// 응답 헤더에 새 액세스 토큰 추가
				if (!newAccessToken.startsWith("Bearer ")) {
					newAccessToken = "Bearer " + newAccessToken;
				}

				// 토큰이 갱신되었음을 클라이언트에게 알림
				response.addHeader(HEADER_AUTH, newAccessToken);
				response.addHeader("Token-Renewed", "true");

				return true;
			}

			log.warn("재발급된 Access Token이 유효하지 않음");
		}


		log.info("Access Token과 Refresh Token 모두 사용 불가능");
		throw new UnAuthorizedException();
	}
}