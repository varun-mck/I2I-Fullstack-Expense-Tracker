// frontend/src/pages/admin/RoleManagement.js

import React, { useState, useEffect } from 'react';
import { assignRoleToUser } from '../../services/roleService';
import axios from 'axios';

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the list of users and roles when the component loads
    const fetchUsersAndRoles = async () => {
      try {
        const usersResponse = await axios.get('/api/users');
        const rolesResponse = await axios.get('/api/roles');
        
        setUsers(usersResponse.data);
        setRoles(rolesResponse.data);
      } catch (error) {
        setErrorMessage('Failed to load users or roles. Please try again later.');
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) {
      setErrorMessage('Please select both a user and a role.');
      return;
    }

    try {
      await assignRoleToUser(selectedUser, selectedRole);
      setSuccessMessage(`Role '${selectedRole}' assigned to user successfully.`);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error assigning role. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Role Management</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div>
        <label htmlFor="user-select">Select User:</label>
        <select id="user-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">--Select a User--</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="role-select">Select Role:</label>
        <select id="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">--Select a Role--</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignRole}>Assign Role</button>
    </div>
  );
};

export default RoleManagement;
