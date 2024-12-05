package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.repository.RoleRepository;
import com.fullStack.expenseTracker.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Fetches all roles from the database and returns them to the caller.
     * Implements RoleRepository to perform the database query.
     * @return List<Role> - list of all roles
     */
    public List<Role> getAllRoles() {
        try {
            return roleRepository.findAll();
        } catch (Exception e) {
            // Log the error for internal tracking purposes, but do not expose internal error details to the caller
            // Assuming there is a logger in place
            System.err.println("Error fetching roles: " + e.getMessage());
            throw new RuntimeException("An error occurred while fetching roles. Please try again later.");
        }
    }
}
