package com.uplus.eureka.comment.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Schema(description = "댓글 번호", example = "1")
    private String commentId; // Primary Key

    public Comment() {}

    public String getCommentId() {return commentId;}

    public void setCommentId(String commentId) {this.commentId = commentId;}

    @Override
    public String toString() {
        return "Comment [commentId=" + commentId + "]";
    }
}
