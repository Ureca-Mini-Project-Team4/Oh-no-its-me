package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dao.CommentDao;
import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentDeleteRequest;
import com.uplus.eureka.comment.model.exception.CommentException;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.comment.model.dto.CommentUpdateRequest;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.http.HttpStatus;
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
    public Comment getCommentById(Integer commentId) {
        System.out.println("commentId = " + commentId);
        Comment comment = dao.getCommentById(commentId);
        System.out.println("조회된 댓글: " + comment);
        if (comment == null) {
            throw new CommentException("요청한 댓글은 등록되지 않았습니다.", HttpStatus.NOT_FOUND);
        }
        return comment;
    }

    @Override
    public List<Comment> getAllComments() {
        // DAO에서 댓글 목록을 한 번만 호출
        List<Comment> comments = dao.getAllComments();

        // 결과가 비어있을 경우 처리 (선택 사항)
        if (comments.isEmpty())
            throw new CommentException("등록되지 않은 댓글을 조회할 수 없습니다.", HttpStatus.NOT_FOUND);

        return comments; // 댓글 목록 반환

    }

    @Override
    public void updateComment(Integer commentId, CommentRequest commentRequest) {
        // 댓글이 존재하는지 확인
        Comment find = dao.getCommentById(commentId);
        if (find == null) throw new CommentException("등록되지 않은 댓글 정보를 수정할 수 없습니다.", HttpStatus.NOT_FOUND);

        // 작성자와 수정 요청자가 다른 경우
        if (!find.getUserId().equals(commentRequest.getUserId())) {
            throw new CommentException("댓글을 수정할 권한이 없습니다.", HttpStatus.FORBIDDEN);  // 에러 처리
        }

        // commentId와 commentRequest를 이용해 CommentUpdateRequest 객체 생성
        CommentUpdateRequest commentUpdateRequest = new CommentUpdateRequest();
        commentUpdateRequest.setCommentId(commentId);  // commentId를 @PathVariable로 전달받은 값으로 설정
        commentUpdateRequest.setUserId(commentRequest.getUserId());  // commentRequest에서 userId를 가져와 설정
        commentUpdateRequest.setCommentText(commentRequest.getCommentText());  // commentRequest에서 commentText를 가져와 설정

        // 로그를 찍어서 값이 제대로 들어갔는지 확인
        System.out.println("commentUpdateRequest: " + commentUpdateRequest);

        // 수정된 댓글로 저장
        dao.updateComment(commentUpdateRequest);
    }

    @Override
    public void insertComment(CommentRequest comment) {
        dao.insertComment(comment);
    }

    @Override
    public void deleteCommentById(Integer commentId, CommentDeleteRequest commentDeleteRequest) {

        // 댓글이 존재하는지 확인
        Comment find = dao.getCommentById(commentId);
        if (find == null) {
            // 댓글이 없다면 404 에러 발생
            throw new CommentException("등록되지 않은 댓글 정보를 삭제할 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        // 작성자와 삭제 요청자가 다른 경우
        if (!find.getUserId().equals(commentDeleteRequest.getUserId())) {
            // 권한이 없다면 403 에러 발생
            throw new CommentException("댓글을 삭제할 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 댓글 삭제
        dao.deleteCommentById(commentId, commentDeleteRequest);

    }

}
