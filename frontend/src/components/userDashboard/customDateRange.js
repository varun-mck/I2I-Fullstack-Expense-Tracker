import React, { useState, useEffect } from 'react';
import { useCustomDateRange } from '../../hooks/useCustomDateRange';
import { fetchDashboardData } from '../../hooks/useDashboard';

const CustomDateRange = () => {
    const { startDate, endDate, setStartDate, setEndDate } = useCustomDateRange();
    
    const handleStartDateChange = (event) => {
        const selectedDate = event.target.value;
        setStartDate(selectedDate);
        fetchDataForDateRange(selectedDate, endDate);
    };

    const handleEndDateChange = (event) => {
        const selectedDate = event.target.value;
        setEndDate(selectedDate);
        fetchDataForDateRange(startDate, selectedDate);
    };

    const fetchDataForDateRange = (start, end) => {
        if (start && end && new Date(start) <= new Date(end)) {
            fetchDashboardData(start, end)
                .then(data => {
                    // handle the success case, e.g., update state or context
                })
                .catch(error => {
                    // handle the error case, e.g., show error message
                    console.error('Failed to fetch data for date range:', error);
                });
        } else {
            // handle invalid date range case
            console.error('Invalid date range selected');
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchDataForDateRange(startDate, endDate);
        }
    }, [startDate, endDate]);

    return (
        <div className="custom-date-range">
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={handleStartDateChange} />
            </label>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={handleEndDateChange} />
            </label>
        </div>
    );
};

export default CustomDateRange;
