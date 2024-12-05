import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminUsersManagement from '../users';   // Adjust the import path as necessary
import * as adminService from '../../../services/adminService';   // Adjust the import path as necessary

jest.mock('../../../services/adminService');

describe('AdminUsersManagement', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  beforeEach(() => {
    adminService.searchUsers.mockResolvedValue(mockUsers);
  });
  
  test('testSearchFunctionality', async () => {
    render(<AdminUsersManagement />);
    
    const searchInput = screen.getByPlaceholderText('Search users...');
    
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(adminService.searchUsers).toHaveBeenCalledWith('John');
    
    const tableRows = await screen.findAllByRole('row');
    expect(tableRows).toHaveLength(2);  // Header row + 1 matching user row
    
    const userCell = screen.getByText('John Doe');
    expect(userCell).toBeInTheDocument();
  });
  
  test('testClearSearch', async () => {
    render(<AdminUsersManagement />);

    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Ensure search was performed
    expect(adminService.searchUsers).toHaveBeenCalledWith('John');
    
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Ensure search was performed for clearing search
    expect(adminService.searchUsers).toHaveBeenCalledWith('');
    
    const tableRows = await screen.findAllByRole('row');
    expect(tableRows).toHaveLength(3);  // Header row + all users
  });
  
  test('testDisplayNoUsersMessage', async () => {
    adminService.searchUsers.mockResolvedValue([]);
    
    render(<AdminUsersManagement />);
    
    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'Unknown User' } });
    
    expect(adminService.searchUsers).toHaveBeenCalledWith('Unknown User');
    
    const noUsersMessage = await screen.findByText('No users found.');
    expect(noUsersMessage).toBeInTheDocument();
  });
});
