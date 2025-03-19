//package com.uplus.eureka.comment.model.exception;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//
//@ControllerAdvice
//public class GlobalExceptionHandler {
//
//    // CommentException 처리
//    @ExceptionHandler(CommentException.class)
//    public ResponseEntity<String> handleCommentException(CommentException ex) {
//        // 콘솔에 오류 메시지 출력
//        System.out.println("Error occurred: " + ex.getMessage());
//
//        // 500 상태 코드와 함께 에러 메시지 반환
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    // 다른 예외 처리 (예: SQLException 등) 추가 가능
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleException(Exception ex) {
//        // 콘솔에 오류 메시지 출력
//        System.out.println("Error occurred: " + ex.getMessage());
//
//        return new ResponseEntity<>("알 수 없는 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}
