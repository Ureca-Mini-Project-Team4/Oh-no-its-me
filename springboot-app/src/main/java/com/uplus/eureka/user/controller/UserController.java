package com.uplus.eureka.user.controller;

import com.uplus.eureka.user.model.dto.LoginRequest;
import com.uplus.eureka.user.model.dto.PasswordUpdateRequest;
import com.uplus.eureka.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.service.UserService;
import com.uplus.eureka.user.model.dto.UserException;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "User Management API", description = "유저 관리 API")
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "로그인", description = "이름과 비밀번호를 사용해서 로그인하고 JWT 토큰 발급")
    @ApiResponse(responseCode = "200", description = "로그인 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청, 유저 ID 또는 비밀번호가 잘못됨")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 입력된 사용자 ID와 비밀번호의 유효성 검사
            if (loginRequest.getUsername() == null ||
                    loginRequest.getPassword() == null ||
                    loginRequest.getUsername().isEmpty() ||
                    loginRequest.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("유저 ID와 비밀번호를 입력하세요.");
            }

            // 사용자 로그인 시도
            User loggedInUser = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

            // 비밀번호 정보는 응답에서 제거
            User userWithoutPassword = new User();
            userWithoutPassword.setUserId(loggedInUser.getUserId());
            userWithoutPassword.setUsername(loggedInUser.getUsername());
            userWithoutPassword.setImg(loggedInUser.getImg());
            userWithoutPassword.setSelected(loggedInUser.isSelected());
            userWithoutPassword.setRandomNickname(loggedInUser.getRandomNickname());
            userWithoutPassword.setVoted(loggedInUser.isVoted());

            // JWT 토큰 생성
            String accessToken = jwtUtil.generateAccessToken(loggedInUser);
            String refreshToken = jwtUtil.generateRefreshToken(loggedInUser);

            // DB에 리프레시 토큰 저장
            userService.saveRefreshToken(loggedInUser.getUserId(), refreshToken);

            // 응답 생성
            Map<String, Object> response = new HashMap<>();
            response.put("user", userWithoutPassword);
            response.put("message", "로그인 성공");

            // 토큰을 헤더에 추가
            HttpStatus status = HttpStatus.OK;
            return ResponseEntity.status(status)
                    .header("Authorization", "Bearer " + accessToken)
                    .header("Refresh-Token", refreshToken)
                    .body(response);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @Operation(
            summary = "유저 정보 조회",
            description = "유저 아이디로 유저 정보를 조회 (인증 필요)",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공")
    @ApiResponse(responseCode = "401", description = "인증 실패")
    @ApiResponse(responseCode = "403", description = "권한 없음")
    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(
            @Parameter(description = "User ID", required = true) @PathVariable("userId") Integer userId,
            @RequestAttribute(name = "userId", required = false) Integer tokenUserId) {

        // 토큰 검증: 토큰이 유효하고 사용자가 인증되었는지 확인
        if (tokenUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증이 필요합니다.");
        }

        // 권한 검증: 본인 정보만 조회 가능하도록 설정 (필요에 따라 관리자 권한 추가 가능)
        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("다른 사용자의 정보를 조회할 권한이 없습니다.");
        }

        try {
            User user = userService.getUser(userId);
            // 비밀번호 정보는 응답에서 제거
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(
            summary = "비밀번호 변경",
            description = "특정 유저의 비밀번호 변경 (인증 필요)",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청")
    @ApiResponse(responseCode = "401", description = "인증 실패")
    @ApiResponse(responseCode = "403", description = "권한 없음")
    @PatchMapping("/{userId}")
    public ResponseEntity<?> updatePassword(
            @PathVariable("userId") Integer userId,
            @RequestBody PasswordUpdateRequest passwordUpdateRequest,
            @RequestAttribute(name = "userId", required = false) Integer tokenUserId) {

        // 토큰 검증: 토큰이 유효하고 사용자가 인증되었는지 확인
        if (tokenUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증이 필요합니다.");
        }

        // 토큰 기반 사용자 검증 (본인 확인)
        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("비밀번호 변경 권한이 없습니다.");
        }

        String oldPassword = passwordUpdateRequest.getOld_password();
        String newPassword = passwordUpdateRequest.getNew_password();

        oldPassword = oldPassword.trim();
        newPassword = newPassword.trim();

        // 입력값 null 또는 공백만 있는 경우 예외 처리
        if (oldPassword == null || oldPassword.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("현재 비밀번호를 입력해주세요.");
        }

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("새 비밀번호를 입력해주세요.");
        }

        // 사용자 정보 조회 및 현재 비밀번호 검증
        User user = userService.getUser(userId);
        String currentPassword = user.getPassword();

        if (!oldPassword.equals(currentPassword)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("현재 비밀번호가 일치하지 않습니다.");
        }

        if (oldPassword.equals(newPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("새 비밀번호가 현재 비밀번호와 동일합니다.");
        }

        // 비밀번호 변경 수행
        userService.updatePassword(userId, newPassword);
        return ResponseEntity.ok("비밀번호 변경 성공");

    }
}