package com.empresadev.rrhhapi.model.exception;

import org.apache.logging.log4j.util.InternalException;

public class CourseNotFoundException extends InternalException {
    public CourseNotFoundException(String message) {
        super(message);
    }
}
