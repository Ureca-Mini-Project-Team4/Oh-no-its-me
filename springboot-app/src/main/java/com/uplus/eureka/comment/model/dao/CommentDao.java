package com.uplus.eureka.comment.model.dao;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.jdbc.SQL;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface CommentDao {
    List<Comment> getAllComments() throws SQLException;
    int totalCount() throws SQLException;
    Comment getCommentById(Integer commentId) throws SQLException;
    void insertComment(CommentRequest comment) throws SQLException;
	void deleteCommentById(Integer commentId);
}
