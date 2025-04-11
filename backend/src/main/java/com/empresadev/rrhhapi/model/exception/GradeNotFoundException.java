package com.empresadev.rrhhapi.model.exception;

import org.apache.logging.log4j.util.InternalException;

public class GradeNotFoundException extends InternalException {

    public GradeNotFoundException(String message) {
        super(message);
    }

    public GradeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public GradeNotFoundException(Throwable cause) {
        super(cause);
    }
}
