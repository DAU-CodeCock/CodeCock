// Custom exception class for invalid credentials
package com.codecock.codecock_backend.service.security;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}