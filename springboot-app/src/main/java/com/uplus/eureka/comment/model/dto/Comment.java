package com.uplus.eureka.comment.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer commentId;  // comment_id
    private Integer userId;  // user_id
    private String randomNickname; // random_nickname
    private String commentText; // comment_text
}
