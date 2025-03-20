package com.uplus.eureka.vote.model.exception;

import com.uplus.eureka.vote.model.exception.VoteException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
public class GlobalExceptionHandler {

    @ExceptionHandler(VoteException.class)
    public ResponseEntity<?> handleVoteException(VoteException ex){
        return ResponseEntity.status(ex.getStatus()).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public  ResponseEntity<?> handleGenericException(Exception ex) {
        return ResponseEntity.status(500).body("서버 내부 오류 발생: " + ex.getMessage());
    }
}
