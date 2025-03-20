package com.uplus.eureka.vote.model.exception;

import com.uplus.eureka.EurekaException;
import org.springframework.http.HttpStatus;

public class VoteException extends EurekaException {
//    public VoteException(String msg) {
//        super(msg);
//    }
    private final HttpStatus status;

    public VoteException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus(){
        return status;
    }
}
