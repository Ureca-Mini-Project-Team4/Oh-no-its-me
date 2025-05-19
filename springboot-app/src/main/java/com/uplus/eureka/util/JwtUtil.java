package com.uplus.eureka.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.uplus.eureka.user.model.dto.User;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtil {

	@Value("${jwt.secret:defaultSecretKeyWhichShouldBeVeryLongForSecurityReasons}")
	private String SECRET_KEY;

	@Value("3600000")
	private long accessTokenExpiration;

	@Value("${jwt.refresh.expiration:604800000}")
	private long refreshTokenExpiration;

	private Key getSigningKey() {
		byte[] keyBytes = SECRET_KEY.getBytes();
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Integer extractUserId(String token) {
		final Claims claims = extractAllClaims(token);
		return claims.get("userId", Integer.class);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	public Claims extractAllClaims(String token) {
		return Jwts.parser()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	// 토큰 유효성 검사
	public boolean checkToken(String token) {
		try {
			return !isTokenExpired(token);
		} catch (Exception e) {
			log.error("토큰 검증 실패: {}", e.getMessage());
			return false;
		}
	}

	public String generateAccessToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", user.getUserId());
		return createToken(claims, user.getUsername(), accessTokenExpiration);
	}

	public String generateRefreshToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", user.getUserId());
		claims.put("type", "refresh");
		return createToken(claims, user.getUsername(), refreshTokenExpiration);
	}

	private String createToken(Map<String, Object> claims, String subject, long expiration) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256)
				.compact();
	}

	public String generateAccessTokenFromRefreshToken(String refreshToken) {
		try {
			if (!checkToken(refreshToken)) {
				log.error("Refresh 토큰이 만료되었습니다.");
				return null;
			}

			Claims claims = extractAllClaims(refreshToken);
			if (!"refresh".equals(claims.get("type"))) {
				log.error("유효한 Refresh 토큰이 아닙니다.");
				return null;
			}

			Integer userId = claims.get("userId", Integer.class);
			String username = claims.getSubject();

			Map<String, Object> newClaims = new HashMap<>();
			newClaims.put("userId", userId);

			return createToken(newClaims, username, accessTokenExpiration);
		} catch (Exception e) {
			log.error("액세스 토큰 재발급 실패", e);
			return null;
		}
	}

}