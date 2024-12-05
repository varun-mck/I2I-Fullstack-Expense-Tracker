package com.fullStack.expenseTracker.services;

public interface RoleService {
    
    /**
     * Assigns a role to a user.
     *
     * @param userId the ID of the user to whom the role will be assigned
     * @param roleName the name of the role to be assigned to the user
     * @throws UserNotFoundException if the user with the specified ID is not found
     * @throws RoleNotFoundException if the role with the specified name is not found
     */
    void assignRoleToUser(Long userId, String roleName) throws UserNotFoundException, RoleNotFoundException;
}
