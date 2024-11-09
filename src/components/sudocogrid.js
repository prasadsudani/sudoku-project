import React from 'react';
import '../styles.css';

const SudokuGrid = ({ grid, onInputChange }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => (
              <input
              key={colIndex}
              type="text"
                  maxLength="1"
                  size={2}
              className="cell form-control"
              value={cellValue || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[1-9]?$/.test(value)) {  // Only allow digits 1-9 or an empty value
                  onInputChange(rowIndex, colIndex, value);
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
