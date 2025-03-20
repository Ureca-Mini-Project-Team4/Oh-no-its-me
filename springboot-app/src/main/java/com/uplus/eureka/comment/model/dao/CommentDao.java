package com.uplus.eureka.comment.model.dao;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentDeleteRequest;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.comment.model.dto.CommentUpdateRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.jdbc.SQL;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface CommentDao {
    List<Comment> getAllComments();
    int totalCount();
    Comment getCommentById(Integer commentId);
    void insertComment(CommentRequest comment);
	void deleteCommentById(Integer commentId, CommentDeleteRequest commentDeleteRequest);
    void updateComment(CommentUpdateRequest comment);
}
