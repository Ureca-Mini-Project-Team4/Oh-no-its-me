package com.uplus.eureka.comment.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @JsonProperty("comment_id")
    @Schema(description = "댓글 작성자 ID", example = "1")
    private Integer commentId;

    @JsonProperty("user_id")
    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @JsonProperty("randome_nickname")
    @Schema(description = "사용자 닉네임", example = "똑똑한 토끼")
    private String randomNickname;

    @JsonProperty("comment_text")
    @Schema(description = "댓글 내용", example = "좋은 투표 결과입니다.")
    private String commentText;
}
