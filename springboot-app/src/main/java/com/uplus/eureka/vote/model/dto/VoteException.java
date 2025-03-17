package com.uplus.eureka.vote.model.dto;

import com.uplus.eureka.EurekaException;

public class VoteException extends EurekaException {
    public VoteException(String msg) {
        super(msg);
    }
}
