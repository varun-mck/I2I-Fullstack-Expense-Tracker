package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.exceptions.RoleNotFoundException;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.models.User;
import com.fullStack.expenseTracker.repositories.RoleRepository;
import com.fullStack.expenseTracker.repositories.UserRepository;
import com.fullStack.expenseTracker.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void assignRoleToUser(Long userId, String roleName) {
        // Fetching the user from the repository
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new UserNotFoundException("User with ID " + userId + " not found");
        }
        User user = userOptional.get();

        // Fetching the role from the repository
        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            throw new RoleNotFoundException("Role " + roleName + " not found");
        }

        // Assigning the role to the user
        user.getRoles().add(role);

        // Saving the updated user entity
        userRepository.save(user);
    }
}
