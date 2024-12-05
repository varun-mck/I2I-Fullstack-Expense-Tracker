package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.ForgotPasswordService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ForgotPasswordControllerTest {

    @InjectMocks
    private ForgotPasswordController forgotPasswordController;

    @Mock
    private ForgotPasswordService forgotPasswordService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testEmailVerification() {
        // Given
        String email = "user@example.com";
        when(forgotPasswordService.verifyEmail(anyString())).thenReturn(true);

        // When
        ResponseEntity<String> response = forgotPasswordController.verifyEmail(email);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Email verification successful", response.getBody());
    }

    @Test
    public void testCodeVerification() {
        // Given
        String code = "123456";
        when(forgotPasswordService.verifyCode(anyString())).thenReturn(true);

        // When
        ResponseEntity<String> response = forgotPasswordController.verifyCode(code);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Code verification successful", response.getBody());
    }

    @Test
    public void testPasswordReset() {
        // Given
        String email = "user@example.com";
        String code = "123456";
        String newPassword = "newPassword123";
        when(forgotPasswordService.resetPassword(anyString(), anyString(), anyString())).thenReturn(true);

        // When
        ResponseEntity<String> response = forgotPasswordController.resetPassword(email, code, newPassword);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password reset successful", response.getBody());
    }
}
