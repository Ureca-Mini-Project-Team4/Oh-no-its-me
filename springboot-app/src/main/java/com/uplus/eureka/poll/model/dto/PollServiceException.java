package com.uplus.eureka.poll.model.dto;

import com.uplus.eureka.EurekaException;

public class PollServiceException extends EurekaException {
    private static final long serialVersionUID = 1L;

    public PollServiceException(String message, Throwable cause) {
        super(message);
        initCause(cause);
    }

    public PollServiceException(String message) {
        super(message);
    }
}
