package com.fullStack.expenseTracker.exceptions;

/**
 * Custom exception thrown when a user is not found in the database.
 * This exception is used by RoleService methods.
 */
public class UserNotFoundException extends RuntimeException {
   
    // Default constructor
    public UserNotFoundException() {
        super("User not found");
    }

    // Constructor with a custom error message
    public UserNotFoundException(String message) {
        super(message);
    }

    // Constructor with a custom error message and a cause
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    // Constructor with a cause
    public UserNotFoundException(Throwable cause) {
        super(cause);
    }
}
