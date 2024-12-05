import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomDateRange from './customDateRange'; // Assumed import path
import { useDateRangeData } from '../../hooks/useDateRangeData'; // Assumed import path for the hook

jest.mock('../../hooks/useDateRangeData');

describe('CustomDateRange', () => {
    const mockUseDateRangeData = useDateRangeData;

    beforeEach(() => {
        mockUseDateRangeData.mockClear();
    });

    test('renders DropdownDatePickers', () => {
        mockUseDateRangeData.mockReturnValue({
            loading: false,
            error: null,
            data: null,
        });

        render(<CustomDateRange />);
        
        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    });

    test('applies selected dates and fetches data', async () => {
        const mockData = {
            income: 5000,
            spending: 3000,
        };

        mockUseDateRangeData.mockReturnValue({
            loading: false,
            error: null,
            data: mockData,
        });

        render(<CustomDateRange />);

        const startDatePicker = screen.getByLabelText(/Start Date/i);
        const endDatePicker = screen.getByLabelText(/End Date/i);

        fireEvent.change(startDatePicker, { target: { value: '2023-01-01' } });
        fireEvent.change(endDatePicker, { target: { value: '2023-12-31' } });

        expect(mockUseDateRangeData).toHaveBeenCalledWith('2023-01-01', '2023-12-31');
        expect(screen.getByText(/Income: 5000/i)).toBeInTheDocument();
        expect(screen.getByText(/Spending: 3000/i)).toBeInTheDocument();
    });

    test('handles loading state', () => {
        mockUseDateRangeData.mockReturnValue({
            loading: true,
            error: null,
            data: null,
        });

        render(<CustomDateRange />);

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('handles error state', () => {
        mockUseDateRangeData.mockReturnValue({
            loading: false,
            error: 'Error fetching data',
            data: null,
        });

        render(<CustomDateRange />);

        expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
    });
});
