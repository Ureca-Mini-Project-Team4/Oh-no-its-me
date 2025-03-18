package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dao.CommentDao;
import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

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


    @Override
    public List<Comment> getAllComments() {
        try {
            // DAO에서 댓글 목록을 한 번만 호출
            List<Comment> comments = dao.getAllComments();

            // 결과가 비어있을 경우 처리 (선택 사항)
            if (comments.isEmpty()) {
                System.out.println("댓글이 없습니다.");
            }
            return comments; // 댓글 목록 반환

        } catch (SQLException e) {
            e.printStackTrace();
            throw new CommentException("댓글 목록 조회 중 오류 발생");
        }
    }


}
