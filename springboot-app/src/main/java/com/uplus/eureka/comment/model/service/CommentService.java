package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.user.model.dto.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    Comment getCommentById(Integer commentId);
    List<Comment> getAllComments();
    void insertComment(CommentRequest comment);
    void deleteCommentById(Integer commentId);

}
