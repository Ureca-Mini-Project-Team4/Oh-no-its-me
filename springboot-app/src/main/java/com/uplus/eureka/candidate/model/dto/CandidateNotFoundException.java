package com.uplus.eureka.candidate.model.dto;

import com.uplus.eureka.EurekaException;

public class CandidateNotFoundException extends EurekaException {
    private static final long serialVersionUID = 1L;

    public CandidateNotFoundException(String message, Throwable cause) {
        super(message);
        initCause(cause);
    }

    public CandidateNotFoundException(String message) {
        super(message);
    }
}
