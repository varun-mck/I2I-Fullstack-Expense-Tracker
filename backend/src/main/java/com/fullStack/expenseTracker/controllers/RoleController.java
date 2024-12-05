package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import com.fullStack.expenseTracker.exceptions.RoleNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/assign")
    public ResponseEntity<String> assignRoleToUser(@RequestParam Long userId, @RequestParam String roleName) {
        try {
            roleService.assignRoleToUser(userId, roleName);
            return ResponseEntity.ok("Role assigned successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        } catch (RoleNotFoundException e) {
            return ResponseEntity.status(404).body("Role not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while assigning the role: " + e.getMessage());
        }
    }
}
