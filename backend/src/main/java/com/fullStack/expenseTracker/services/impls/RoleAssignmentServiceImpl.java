package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.models.User;
import com.fullStack.expenseTracker.repository.RoleRepository;
import com.fullStack.expenseTracker.repository.UserRepository;
import com.fullStack.expenseTracker.services.RoleAssignmentService;
import com.fullStack.expenseTracker.services.UserService;
import com.fullStack.expenseTracker.exceptions.RoleNotFoundException;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleAssignmentServiceImpl implements RoleAssignmentService {

    private final UserService userService;
    private final RoleRepository roleRepository;

    @Autowired
    public RoleAssignmentServiceImpl(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @Override
    public void assignRoleToUser(String username, String roleName) {
        User user = userService.findByName(username);
        if (user == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }

        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            throw new RoleNotFoundException("Role not found with name: " + roleName);
        }

        user.addRole(role); // assuming a method addRole exists in User
        userService.save(user);
    }
}
