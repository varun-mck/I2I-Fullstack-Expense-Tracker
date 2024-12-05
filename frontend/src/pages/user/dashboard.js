// File: frontend/src/pages/user/dashboard.js
import React, { useEffect } from 'react';
import CustomDateRange from '../../components/userDashboard/customDateRange';
import useCustomDateRange from '../../hooks/useCustomDateRange';
import { fetchDashboardData } from '../../hooks/useDashboard';

const Dashboard = () => {
  const { startDate, endDate, setStartDate, setEndDate, initializeDateRange } = useCustomDateRange();

  // Function to fetch initial data for the user dashboard
  const useRetrieveInitialData = async () => {
    try {
      await initializeDateRange(); // Initialize date range with default dates
      await fetchDashboardData(startDate, endDate); // Fetch data for default date range
    } catch (error) {
      console.error('Failed to fetch initial dashboard data:', error);
    }
  };

  useEffect(() => {
    useRetrieveInitialData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <CustomDateRange 
        startDate={startDate} 
        endDate={endDate} 
        onStartDateChange={setStartDate} 
        onEndDateChange={setEndDate} 
      />
      {/* Render the dashboard data component here */}
    </div>
  );
};

export default Dashboard;
