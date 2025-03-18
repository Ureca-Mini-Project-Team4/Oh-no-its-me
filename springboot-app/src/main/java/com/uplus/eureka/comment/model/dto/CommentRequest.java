package com.uplus.eureka.comment.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class CommentRequest implements Serializable {
    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("comment_text")
    private String commentText;
}
