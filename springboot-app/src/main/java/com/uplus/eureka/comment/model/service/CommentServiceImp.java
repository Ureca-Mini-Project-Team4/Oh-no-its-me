package com.uplus.eureka.comment.model.service;

import com.uplus.eureka.comment.model.dao.CommentDao;
import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentDeleteRequest;
import com.uplus.eureka.comment.model.exception.CommentException;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.comment.model.dto.CommentUpdateRequest;
import com.uplus.eureka.user.model.dao.UserDao;
import com.uplus.eureka.user.model.dto.User;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
@Transactional
public class CommentServiceImp implements CommentService {

    private final CommentDao dao;
    private final UserDao userDao;

    public CommentServiceImp(CommentDao dao, UserDao userDao) {
        this.userDao = userDao;
        if(dao ==null){
            throw new IllegalArgumentException("dao is null");
        }
        this.dao = dao;
    }

    @Override
    public Comment getCommentById(Integer commentId) {
        Comment comment = dao.getCommentById(commentId);

        // 404 NOT_FOUND
        if (comment == null) {
            throw new CommentException("요청한 댓글은 등록되지 않았습니다.", HttpStatus.NOT_FOUND);
        }
        // 200 SUCCESS
        return comment;
    }

    @Override
    public List<Comment> getAllComments() {
        // DAO에서 댓글 목록을 한 번만 호출
        List<Comment> comments = dao.getAllComments();

        // 204 No Conetent
        // 200 SUCCESS
        return comments; // 댓글 목록 반환

    }

    @Override
    public void updateComment(Integer commentId, CommentRequest commentRequest) {

        // 401 Unauthorized
        User findUser = userDao.getUser(commentRequest.getUserId());
        if(findUser == null){
            throw new CommentException("등록되지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED);
        }

        // 404 Not Found
        Comment find = dao.getCommentById(commentId);
        if (find == null) throw new CommentException("등록되지 않은 댓글 정보를 수정할 수 없습니다.", HttpStatus.NOT_FOUND);

        // 403 Forbidden
        if (!find.getUserId().equals(commentRequest.getUserId())) {
            throw new CommentException("댓글을 수정할 권한이 없습니다.", HttpStatus.FORBIDDEN);  // 에러 처리
        }

        // commentId와 commentRequest를 이용해 CommentUpdateRequest 객체 생성
        CommentUpdateRequest commentUpdateRequest = new CommentUpdateRequest();
        commentUpdateRequest.setCommentId(commentId);  // commentId를 @PathVariable로 전달받은 값으로 설정
        commentUpdateRequest.setUserId(commentRequest.getUserId());  // commentRequest에서 userId를 가져와 설정
        commentUpdateRequest.setCommentText(commentRequest.getCommentText());  // commentRequest에서 commentText를 가져와 설정

        // 200 SUCCESS : 수정된 댓글로 저장
        dao.updateComment(commentUpdateRequest);
    }

    @Override
    public void insertComment(CommentRequest comment) {

        // 401 Unauthorized
        User findUser = userDao.getUser(comment.getUserId());
        if(findUser == null){
            throw new CommentException("등록되지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED);
        }

        // 201 CREATED
        dao.insertComment(comment);
    }

    @Override
    public void deleteCommentById(Integer commentId, CommentDeleteRequest commentDeleteRequest) {


        Comment find = dao.getCommentById(commentId);
        // 404 Not found
        if (find == null) {
            throw new CommentException("등록되지 않은 댓글 정보를 삭제할 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        // 403 Forbidden
        if (!find.getUserId().equals(commentDeleteRequest.getUserId())) {
            throw new CommentException("댓글을 삭제할 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 200 SUCCESS
        dao.deleteCommentById(commentId, commentDeleteRequest);

    }

}
