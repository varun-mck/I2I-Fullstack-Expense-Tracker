package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleAssignmentRepository extends JpaRepository<User, Long> {

    /**
     * Assigns a role to a user by updating the user's roles field.
     * Ensures that both user and role references are valid.
     *
     * @param userId the ID of the user to whom the role is being assigned
     * @param roleId the ID of the role being assigned
     */
    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.roles = (SELECT r FROM Role r WHERE r.id = :roleId) WHERE u.id = :userId")
    void assignRoleToUser(@Param("userId") Long userId, @Param("roleId") Long roleId);

    /**
     * Finds a user by their username.
     *
     * @param username the username to search for
     * @return the user with the specified username
     */
    User findByUsername(String username);

    /**
     * Finds a role by its name.
     *
     * @param roleName the name of the role to search for
     * @return the role with the specified name
     */
    Role findByName(String roleName);

}
