package com.uplus.eureka.comment.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRequest {
    private Integer userId;     // user_id
    private String commentText;     // comment_text

    public CommentRequest(Integer userId, String commentText) {
        this.userId = userId;
        this.commentText = commentText;
    }
}
