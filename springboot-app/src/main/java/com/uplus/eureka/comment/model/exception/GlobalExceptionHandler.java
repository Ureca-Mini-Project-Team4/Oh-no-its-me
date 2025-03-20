package com.uplus.eureka.comment.model.exception;

import com.uplus.eureka.comment.model.exception.CommentException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CommentException.class)
    public ResponseEntity<Map<String, Object>> handleCommentException(CommentException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("msg", ex.getMessage()); // 에러 메시지만 반환
        return ResponseEntity.status(ex.getStatus()).body(response);
    }
}
