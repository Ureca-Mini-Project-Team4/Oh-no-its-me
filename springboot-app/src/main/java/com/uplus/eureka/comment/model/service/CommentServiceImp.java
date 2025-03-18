package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dao.CommentDao;
import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

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
        try{
            Comment comment = dao.getCommentById(commentId);
            if(comment == null){
                throw new CommentException("요청한 댓글은 등록되지 않았습니다.");
            }
            return comment;
        }catch (SQLException e){
            throw new CommentException("댓글 정보 조회 중 오류 발생");
        }
    }
    
    @Override
    public long deleteCommentById(Long commentId) {
        try {
            Comment comment = dao.getCommentById(commentId);
            
            if (comment == null) {
                throw new CommentException("요청한 댓글은 등록되지 않았습니다.");
            }
            long result = dao.deleteCommentById(commentId);
            
            if (result == 0) {
                throw new CommentException("댓글 삭제 중 오류 발생");
            }
            return result;
        } catch (SQLException e) {
            throw new CommentException("댓글 정보 조회 중 오류 발생");
        }
    }


}
