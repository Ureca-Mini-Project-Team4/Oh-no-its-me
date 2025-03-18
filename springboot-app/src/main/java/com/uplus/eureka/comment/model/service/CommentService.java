package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.user.model.dto.User;

import java.util.List;

public interface CommentService {
//    User login(String userId, String pass);
//    User get(String userId);
//    void signup(User user);

    Comment getCommentById(Long commentId);
    long deleteCommentById(Long commentId);
    List<Comment> getAllComments();
}
