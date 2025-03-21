package com.uplus.eureka.vote.model.exception;

import com.uplus.eureka.EurekaException;
import org.springframework.http.HttpStatus;

public class VoteException extends EurekaException {
    private final HttpStatus status;

    public VoteException(String msg, HttpStatus status) {
        super(msg);
        this.status = status;
    }

    public HttpStatus getStatus(){
        return status;
    }
}
