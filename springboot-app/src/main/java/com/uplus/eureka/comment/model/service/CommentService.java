package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.user.model.dto.User;

import java.util.List;

public interface CommentService {

    Comment getCommentById(Long commentId);
    List<Comment> getAllComments();
    void insertComment(CommentRequest comment);
    long deleteCommentById(Long commentId);

}
