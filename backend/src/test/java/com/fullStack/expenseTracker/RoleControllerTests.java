package com.fullStack.expenseTracker;

import com.fullStack.expenseTracker.controllers.RoleController;
import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.models.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RoleControllerTests {
    
    @InjectMocks
    private RoleController roleController;

    @Mock
    private RoleService roleService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllRoles() {
        Role role1 = new Role("Admin");
        Role role2 = new Role("User");
        List<Role> roles = Arrays.asList(role1, role2);

        when(roleService.getAllRoles()).thenReturn(roles);

        ResponseEntity<List<Role>> response = roleController.getAllRoles();
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(roles, response.getBody());
    }

    @Test
    public void testCreateRole() {
        Role role = new Role("Manager");

        when(roleService.createRole(any(Role.class))).thenReturn(role);

        ResponseEntity<Role> response = roleController.createRole(role);
        
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(role, response.getBody());
    }

    @Test
    public void testDeleteRole() {
        String roleName = "Manager";

        doNothing().when(roleService).deleteRole(roleName);

        ResponseEntity<Void> response = roleController.deleteRole(roleName);
        
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
