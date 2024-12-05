import React, { useState } from 'react';
import DropdownDatePicker from '../../components/datePicker/DropdownDatePicker';
import useDateRangeData from '../../hooks/useDateRangeData';
import { formatDateToDropdownFriendly } from '../../utils/dateUtils'; // Assuming we have a utility to format dates

const CustomDateRange = () => {
  // State managements
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch data based on date range using custom hook
  const { data, loading, error } = useDateRangeData(startDate, endDate);

  // Event handlers
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const renderDropdowns = () => {
    return (
      <>
        <DropdownDatePicker
          selectedDate={startDate}
          onChange={handleStartDateChange}
          disabled={loading}
          label="Start Date"
        />
        <DropdownDatePicker
          selectedDate={endDate}
          onChange={handleEndDateChange}
          disabled={loading}
          label="End Date"
        />
      </>
    );
  };

  const renderData = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error loading data</div>;
    }
    if (!data || data.length === 0) {
      return <div>No data available for the selected date range</div>;
    }

    return (
      <div>
        <h3>Income and Spending Data</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h2>Select Custom Date Range</h2>
      <div className="dropdowns-container">
        {renderDropdowns()}
      </div>
      <div className="data-display-container">
        {renderData()}
      </div>
    </div>
  );
};

export default CustomDateRange;
