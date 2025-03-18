package com.uplus.eureka.comment.model.dao;

import com.uplus.eureka.comment.model.dto.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.jdbc.SQL;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface CommentDao {
    List<Comment> getAllComments() throws SQLException;
    int totalCount() throws SQLException;
    Comment getCommentById(Long commentId) throws SQLException;


}
