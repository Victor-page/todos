import React from 'react';
import { StatusFilters } from '../filters/filtersSlice';

const StatusFilter = ({ value: status, onChange }) => {
  const renderFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);
    const className = value === status ? 'selected' : '';

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderFilters}</ul>
    </div>
  );
};

export default StatusFilter;
