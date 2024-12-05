package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.models.User;
import com.fullStack.expenseTracker.repository.RoleRepository;
import com.fullStack.expenseTracker.repository.UserRepository;
import com.fullStack.expenseTracker.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleAssignmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public void assignRoleToUser(Long userId, Long roleId) throws ResourceNotFoundException {
        // Retrieve the user by ID, throw an exception if not found
        User user = userRepository.findById(userId).orElseThrow(() -> 
            new ResourceNotFoundException("User not found with ID: " + userId));

        // Retrieve the role by ID, throw an exception if not found
        Role role = roleRepository.findById(roleId).orElseThrow(() -> 
            new ResourceNotFoundException("Role not found with ID: " + roleId));

        // Add the role to the user's roles
        user.getRoles().add(role);

        // Save the updated user entity
        userRepository.save(user);
    }
}
