package com.uplus.eureka.comment.model.dto;

public class Comment {
    private Long commentId;  // comment_id
    private Integer userId;     // user_id
    private String randomNickname; // random_nickname
    private String commentText;     // comment_text

    // 생성자
    public Comment(Long commentId, Integer userId, String randomNickname, String commentText) {
        this.commentId = commentId;
        this.userId = userId;
        this.randomNickname = randomNickname;
        this.commentText = commentText;
    }

    // Getter 및 Setter
    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getRandomNickname() {
        return randomNickname;
    }

    public void setRandomNickname(String randomNickname) {
        this.randomNickname = randomNickname;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }
}
