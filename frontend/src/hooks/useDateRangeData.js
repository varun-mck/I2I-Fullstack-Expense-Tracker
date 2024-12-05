// frontend/src/hooks/useDateRangeData.js

import { useState, useEffect } from 'react';
import { UserService } from '../services/UserService'; // Assumption: Import UserService from appropriate path

/**
 * Custom React hook that fetches and manages income and spending data
 * for a selected date range.
 * 
 * @param {string} startDate - The start date of the range.
 * @param {string} endDate - The end date of the range.
 * @returns {object} - An object containing loading, error states, and the fetched data.
 */
export function useDateRangeData(startDate, endDate) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ income: [], spending: [] });

  useEffect(() => {
    let isMounted = true;

    const fetchDataForDateRange = async (start, end) => {
      setLoading(true);
      try {
        const response = await UserService.getDataForDateRange(start, end);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData({ income: [], spending: [] });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (startDate && endDate) {
      fetchDataForDateRange(startDate, endDate);
    }

    return () => {
      isMounted = false;
    };
  }, [startDate, endDate]);

  return { loading, error, data };
}
