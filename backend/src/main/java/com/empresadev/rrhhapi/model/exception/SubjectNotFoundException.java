package com.empresadev.rrhhapi.model.exception;

import org.apache.logging.log4j.util.InternalException;

public class SubjectNotFoundException extends InternalException {
    public SubjectNotFoundException(String message) {
        super(message);
    }
}
