package com.uplus.eureka.comment.model.dao;

import com.uplus.eureka.comment.model.dto.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.jdbc.SQL;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface CommentDao {
    public List<Comment> getAllComments() throws SQLException;
    public int totalCount() throws SQLException;
    public Comment getCommentById(Long commentId) throws SQLException;


}
