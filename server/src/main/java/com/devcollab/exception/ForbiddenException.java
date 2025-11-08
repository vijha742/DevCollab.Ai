package com.devcollab.exception;

/**
 * Exception thrown for forbidden access attempts
 */
public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }
}
