package com.fullStack.expenseTracker;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.models.Role;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class RoleServiceTests {

    @InjectMocks
    private RoleService roleService;

    @Mock
    private RoleRepository roleRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllRoles() {
        // Arrange
        Role role1 = new Role(1, "Admin");
        Role role2 = new Role(2, "User");
        List<Role> roles = Arrays.asList(role1, role2);

        when(roleRepository.findAll()).thenReturn(roles);

        // Act
        List<Role> result = roleService.getAllRoles();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Admin", result.get(0).getName());
        assertEquals("User", result.get(1).getName());

        verify(roleRepository, times(1)).findAll();
    }

    // Additional test cases can be added here
}
