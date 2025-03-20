package com.uplus.eureka.comment.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Data
@Schema(description = "댓글 등록 요청 객체 모델")
public class CommentDeleteRequest implements Serializable {

    @JsonProperty("user_id")
    @Schema(description = "댓글 작성자 ID", example = "1")
    private Integer userId;

}
