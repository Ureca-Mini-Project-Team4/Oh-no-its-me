package com.uplus.eureka.user.model.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Schema(description = "사용자 아이디", example = "1")
	private Integer userId; // Integer로 변경해야 함

	@Schema(description = "사용자 이름", example = "김멀캠")
	private String username; // Unique

	@Schema(description = "비밀번호", example = "0000")
	private String password; // 안전을 위해 포함시키지 않도록 주의

	@Schema(description = "프로필 이미지 경로", example = "/images/profile/1.jpg")
	private String img;

	@Schema(description = "투표에 후보자로 선정된 유무", example = "false")
	private boolean isSelected;

	@Schema(description = "랜덤 닉네임", example = "물먹는하마")
	private String randomNickname; // Unique

	@Schema(description = "투표여부", example = "false")
	private boolean isVoted;
}