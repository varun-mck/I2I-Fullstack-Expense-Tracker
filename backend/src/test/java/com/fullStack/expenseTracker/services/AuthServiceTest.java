package com.fullStack.expenseTracker.services;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.fullStack.expenseTracker.services.AuthService;
import com.fullStack.expenseTracker.repositories.UserRepository;
import com.fullStack.expenseTracker.models.User;
import com.fullStack.expenseTracker.exceptions.InvalidCodeException;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Optional;

public class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JavaMailSender mailSender;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendPasswordResetEmail() {
        // Setup
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        // Mocks
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Execute
        authService.sendPasswordResetEmail(email);

        // Verify
        verify(mailSender, times(1)).send(any());
    }

    @Test
    public void testVerifyPasswordResetCode() {
        // Setup
        String email = "test@example.com";
        String code = "testcode";
        User user = new User();
        user.setEmail(email);
        user.setResetCode(code);

        // Mocks
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Execute and Verify
        try {
            authService.verifyPasswordResetCode(email, code);
        } catch (Exception e) {
            // Should not reach here
            assert (false);
        }
    }

    @Test
    public void testVerifyPasswordResetCode_invalidCode() {
        // Setup
        String email = "test@example.com";
        String code = "wrongcode";
        User user = new User();
        user.setEmail(email);
        user.setResetCode("testcode");

        // Mocks
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Execute and Verify
        try {
            authService.verifyPasswordResetCode(email, code);
            assert (false); // Should not reach here
        } catch (InvalidCodeException e) {
            // Expected outcome
        }
    }

    @Test
    public void testChangePasswordUsingResetCode() {
        // Setup
        String email = "test@example.com";
        String code = "testcode";
        String newPassword = "newpassword";
        User user = new User();
        user.setEmail(email);
        user.setResetCode(code);

        // Mocks
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Execute
        authService.changePasswordUsingResetCode(email, code, newPassword);

        // Verify
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testChangePasswordUsingResetCode_invalidCode() {
        // Setup
        String email = "test@example.com";
        String code = "wrongcode";
        String newPassword = "newpassword";
        User user = new User();
        user.setEmail(email);
        user.setResetCode("testcode");

        // Mocks
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Execute and Verify
        try {
            authService.changePasswordUsingResetCode(email, code, newPassword);
            assert (false); // Should not reach here
        } catch (InvalidCodeException e) {
            // Expected outcome
        }
    }
}
