package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.repository.RoleRepository;
import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.models.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        try {
            // Fetching all roles from the database
            List<Role> roles = roleRepository.findAll();
            
            // Validation to check if roles are retrieved
            if (roles == null || roles.isEmpty()) {
                throw new RuntimeException("No roles found in the database");
            }

            return roles;
        } catch (Exception e) {
            // Logging the exception properly (Consider using a logging framework for production)
            System.err.println("Error fetching roles: " + e.getMessage());
            throw new RuntimeException("Failed to fetch roles", e);
        }
    }

}
