package com.uplus.eureka.comment.model.exception;

import com.uplus.eureka.EurekaException;
import org.springframework.http.HttpStatus;

public class CommentException extends EurekaException {
    private HttpStatus status;

    // 상태 코드와 메시지를 받는 생성자 추가
    public CommentException(String msg, HttpStatus status) {
        super(msg);
        this.status = status;
    }

    // 상태 코드를 반환하는 메서드
    public HttpStatus getStatus() {
        return status;
    }
}
