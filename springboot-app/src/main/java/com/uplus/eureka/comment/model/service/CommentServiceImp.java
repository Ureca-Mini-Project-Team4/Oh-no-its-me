package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dao.CommentDao;
import com.uplus.eureka.comment.model.dto.Comment;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImp implements CommentService {

    private final CommentDao dao;

    public CommentServiceImp(CommentDao dao) {
        if(dao ==null){
            throw new IllegalArgumentException("dao is null");
        }
        this.dao = dao;
    }

    @Override
    public Comment getCommentById(Long commentId) {
        return null;
    }

}
