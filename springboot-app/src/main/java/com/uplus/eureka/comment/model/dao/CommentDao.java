package com.uplus.eureka.comment.model.dao;

import com.uplus.eureka.comment.model.dto.Comment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentDao {
    Comment get(String commentId);
}
