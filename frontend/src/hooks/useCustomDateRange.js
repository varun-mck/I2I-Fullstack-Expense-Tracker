import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData } from '../services/dashboardService';

// useCustomDateRange.js
const useCustomDateRange = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const initializeDateRange = useCallback((defaultStartDate, defaultEndDate) => {
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
        fetchDataForDateRange(defaultStartDate, defaultEndDate);
    }, []);

    const fetchDataForDateRange = useCallback(async (start, end) => {
        try {
            const data = await fetchDashboardData(start, end);
            // handle the data (update state or pass the data to the component)
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Add error handling logic here (e.g., error notification to user)
        }
    }, []);

    const handleStartDateChange = useCallback((newStartDate) => {
        setStartDate(newStartDate);
        if (endDate && newStartDate <= endDate) {
            fetchDataForDateRange(newStartDate, endDate);
        } else {
            // handle case when startDate is after endDate, if necessary
        }
    }, [endDate, fetchDataForDateRange]);

    const handleEndDateChange = useCallback((newEndDate) => {
        setEndDate(newEndDate);
        if (startDate && newEndDate >= startDate) {
            fetchDataForDateRange(startDate, newEndDate);
        } else {
            // handle case when endDate is before startDate, if necessary
        }
    }, [startDate, fetchDataForDateRange]);

    return {
        startDate,
        endDate,
        setStartDate: handleStartDateChange,
        setEndDate: handleEndDateChange,
        initializeDateRange,
    };
};

export default useCustomDateRange;
