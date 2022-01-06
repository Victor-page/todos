import React from 'react';
import { availableColors, capitalize } from '../filters/colors';

const ColorFilters = ({ value: colors, onChange }) => {
  const renderColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added';
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderColors}</form>
    </div>
  );
};

export default ColorFilters;
