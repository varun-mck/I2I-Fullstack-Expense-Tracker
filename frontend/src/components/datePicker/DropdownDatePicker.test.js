import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownDatePicker from './DropdownDatePicker';

describe('DropdownDatePicker Component', () => {
  const mockOnChange = jest.fn();
  const dateOptions = [
    { value: '2023-01-01', label: 'January 1, 2023' },
    { value: '2023-01-02', label: 'January 2, 2023' },
    // Add more options as needed
  ];

  const setup = (selectedDate = '') => {
    render(<DropdownDatePicker selectedDate={selectedDate} onChange={mockOnChange} options={dateOptions} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dropdown menu', () => {
    setup();

    // Check if the dropdown is rendered
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  test('displays the correct options', () => {
    setup();

    // Open the dropdown menu
    fireEvent.mouseDown(screen.getByRole('button'));

    // Check if the options are rendered
    dateOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('selects a date from the dropdown', () => {
    setup();

    // Open the dropdown menu
    fireEvent.mouseDown(screen.getByRole('button'));

    // Select an option
    const option = screen.getByText(dateOptions[0].label);
    fireEvent.click(option);

    // Check if the onChange handler is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith(dateOptions[0].value);
  });

  test('displays the selected date', () => {
    setup(dateOptions[1].value);

    // Check if the selected date is displayed correctly
    expect(screen.getByText(dateOptions[1].label)).toBeInTheDocument();
  });
});
