package com.fullStack.expenseTracker;

import com.fullStack.expenseTracker.services.RoleAssignmentService;
import com.fullStack.expenseTracker.services.UserService;
import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.models.User;
import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.repository.RoleAssignmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class RoleAssignmentServiceTests {

    @Mock
    private UserService userService;

    @Mock
    private RoleService roleService;

    @Mock
    private RoleAssignmentRepository roleAssignmentRepository;

    @InjectMocks
    private RoleAssignmentService roleAssignmentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAssignRoleToUser() {
        // Arrange
        String username = "testUser";
        String roleName = "ADMIN";

        User user = new User();
        user.setUsername(username);

        Role role = new Role();
        role.setName(roleName);

        when(userService.findByName(anyString())).thenReturn(Optional.of(user));
        when(roleService.findByName(anyString())).thenReturn(Optional.of(role));
        doNothing().when(roleAssignmentRepository).assignRoleToUser(user.getUsername(), role.getName());

        // Act
        boolean result = roleAssignmentService.assignRoleToUser(username, roleName);

        // Assert
        assertTrue(result);
        verify(userService, times(1)).findByName(username);
        verify(roleService, times(1)).findByName(roleName);
        verify(roleAssignmentRepository, times(1)).assignRoleToUser(user.getUsername(), role.getName());
    }

    @Test
    public void testAssignRoleToUser_UserNotFound() {
        // Arrange
        String username = "nonExistingUser";
        String roleName = "ADMIN";

        when(userService.findByName(anyString())).thenReturn(Optional.empty());

        // Act
        boolean result = roleAssignmentService.assignRoleToUser(username, roleName);

        // Assert
        assertFalse(result);
        verify(userService, times(1)).findByName(username);
        verify(roleService, never()).findByName(roleName);
        verify(roleAssignmentRepository, never()).assignRoleToUser(anyString(), anyString());
    }

    @Test
    public void testAssignRoleToUser_RoleNotFound() {
        // Arrange
        String username = "testUser";
        String roleName = "NON_EXISTING_ROLE";

        User user = new User();
        user.setUsername(username);

        when(userService.findByName(anyString())).thenReturn(Optional.of(user));
        when(roleService.findByName(anyString())).thenReturn(Optional.empty());

        // Act
        boolean result = roleAssignmentService.assignRoleToUser(username, roleName);

        // Assert
        assertFalse(result);
        verify(userService, times(1)).findByName(username);
        verify(roleService, times(1)).findByName(roleName);
        verify(roleAssignmentRepository, never()).assignRoleToUser(anyString(), anyString());
    }
}
