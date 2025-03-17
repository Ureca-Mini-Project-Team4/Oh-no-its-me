package com.uplus.eureka.user.controller;

import com.uplus.eureka.user.model.dto.LoginRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.service.UserService;
import com.uplus.eureka.user.model.dto.UserException;
import java.util.Map;

@Tag(name = "User Management API", description = "유저 관리 API")
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "User Login", description = "Authenticate a user with user ID and password.")
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

            loggedInUser.setPassword(null); // 비밀번호를 null로 설정하여 정보 노출 방지

            return ResponseEntity.ok(loggedInUser); // User 객체 반환
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @Operation(summary = "Get User Information", description = "유저 정보 조회")
    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공")
    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(
            @Parameter(description = "User ID", required = true) @PathVariable("userId") Integer userId) {
        try {
            User user = userService.getUser(userId);
            return ResponseEntity.ok(user);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(summary = "Update password", description = "비밀번호 변경")
    @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청")
    @ApiResponse(responseCode = "403", description = "권한 없음")
    @PatchMapping("/{userId}")
    public ResponseEntity<?> updatePassword(
            @PathVariable("userId") Integer userId,
            @RequestBody Map<String, String> info) {

        String oldPassword = info.get("old_password");
        String newPassword = info.get("new_password");

        // 사용자 정보 조회
        User user = userService.getUser(userId);
        String currentPassword = user.getPassword(); // 현재 비밀번호 가져오기

        // 비밀번호 유효성 검사
        if (oldPassword.equals(currentPassword)) {  // Use matches to compare
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("비밀번호 변경 실패");
        }

        if (oldPassword.equals(newPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 동일합니다.");
        }

        userService.updatePassword(userId, newPassword); // 데이터베이스에 새 비밀번호 업데이트하여 저장
        return ResponseEntity.ok("비밀번호 변경 성공");
    }


}
