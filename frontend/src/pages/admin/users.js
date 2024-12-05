// frontend/src/pages/admin/users.js

import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const AdminUsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [noUsersMessage, setNoUsersMessage] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await adminService.getAllUsers();
            setUsers(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            fetchUsers();
            return;
        }

        try {
            const filteredUsers = await adminService.searchUsers(term);
            setUsers(filteredUsers);

            if (filteredUsers.length === 0) {
                setNoUsersMessage(true);
            } else {
                setNoUsersMessage(false);
            }
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        fetchUsers();
        setNoUsersMessage(false);
    };

    const displayNoUsersMessage = () => {
        return noUsersMessage ? <p>No users found.</p> : null;
    };

    return (
        <div>
            <h1>User Management</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users..."
            />
            <button onClick={clearSearch}>Clear Search</button>
            {displayNoUsersMessage()}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersManagement;
