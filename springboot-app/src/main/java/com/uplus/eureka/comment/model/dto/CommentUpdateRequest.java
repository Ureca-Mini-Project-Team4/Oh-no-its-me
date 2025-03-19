package com.uplus.eureka.comment.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class CommentUpdateRequest implements Serializable {
    @JsonProperty("comment_id")  // comment_id 추가
    private Integer commentId;

    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("comment_text")
    private String commentText;
}
