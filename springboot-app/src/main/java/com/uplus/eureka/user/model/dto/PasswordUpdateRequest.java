package com.uplus.eureka.user.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordUpdateRequest {
	@Schema(description = "현재 비밀번호", example = "현재비밀번호", required = true)
	private String old_password;

	@Schema(description = "새 비밀번호", example = "새비밀번호", required = true)
	private String new_password;
}