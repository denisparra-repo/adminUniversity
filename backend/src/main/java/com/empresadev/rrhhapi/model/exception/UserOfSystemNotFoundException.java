package com.empresadev.rrhhapi.model.exception;

import org.apache.logging.log4j.util.InternalException;

public class UserOfSystemNotFoundException extends InternalException {

    public UserOfSystemNotFoundException(String message) {
        super(message);
    }

    public UserOfSystemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserOfSystemNotFoundException(Throwable cause) {
        super(cause);
    }
}