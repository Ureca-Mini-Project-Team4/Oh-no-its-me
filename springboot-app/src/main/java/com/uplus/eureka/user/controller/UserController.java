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

@Tag(name = "User Management API", description = "유저 관리 API")
@RestController
@RequestMapping("/user")
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
            if (loginRequest.getUserId() == null || loginRequest.getPassword() == null) {
                return ResponseEntity.badRequest().body("유저 ID와 비밀번호를 입력하세요.");
            }
            User loggedInUser = userService.login(loginRequest.getUserId(), loginRequest.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @Operation(summary = "Get User Information", description = "Retrieve user information by user ID.")
    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공")
    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음")
    @GetMapping("get/{userId}")
    public ResponseEntity<?> getUser(
            @Parameter(description = "User ID", required = true) @PathVariable String userId) {
        try {
            User user = userService.get(userId);
            return ResponseEntity.ok(user);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(summary = "User Signup", description = "Register a new user.")
    @ApiResponse(responseCode = "201", description = "회원가입 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청, 사용자 정보가 유효하지 않음")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("비밀번호는 필수입니다.");
            }
            if (user.getUsername() == null || user.getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body("사용자 이름은 필수입니다.");
            }

            // 서비스에서 중복 검증 및 암호화 등 처리
            userService.signup(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공!");
        } catch (UserException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
