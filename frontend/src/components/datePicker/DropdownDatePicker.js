import React from 'react';
import PropTypes from 'prop-types';

/**
 * DropdownDatePicker functional component.
 * Provides a dropdown menu for selecting dates.
 * 
 * @param {Object} props - The component props.
 * @param {Date} props.selectedDate - The currently selected date.
 * @param {function} props.onChange - Handler function for date change.
 * @param {Array<Date>} props.dateRange - Array of dates to display in the dropdown.
 * @returns {JSX.Element} The rendered component.
 */
const DropdownDatePicker = ({ selectedDate, onChange, dateRange }) => {
  // Function to render date options in the dropdown
  const renderDateOptions = () => {
    return dateRange.map((date, index) => (
      <option key={index} value={date.toISOString()}>
        {date.toDateString()}
      </option>
    ));
  };

  // Event handler for selecting a date from the dropdown
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    onChange(selectedDate);
  };

  return (
    <div className="dropdown-date-picker">
      <select
        value={selectedDate ? selectedDate.toISOString() : ''}
        onChange={handleDateChange}
      >
        {renderDateOptions()}
      </select>
    </div>
  );
};

DropdownDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default DropdownDatePicker;
