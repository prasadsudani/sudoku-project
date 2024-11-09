import React, { useState } from 'react';
import SudokuGrid from './components/sudocogrid';
import { solveSudoku, isValid } from './components/sudocoServer';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialGrid = Array(9).fill("").map(() => Array(9).fill("")); // Define an empty initial grid
  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState("");

  // Handle changes to any cell in the Sudoku grid
  const handleInputChange = (row, col, value) => {
    const newGrid = grid.map((rowArr) => [...rowArr]); // Create a deep copy of the grid
    newGrid[row][col] = value ? parseInt(value, 10) : ""; // Convert value to integer or clear it
    setGrid(newGrid); // Update grid state
    setError(""); // Clear any previous error
  };

  // Validate the grid to ensure it meets Sudoku constraints
  const validateGrid = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = grid[row][col];
        if (value && !isValid(grid, row, col, value)) { // Check if value is valid
          setError(`Invalid input at row ${row + 1}, column ${col + 1}`);
          return;
        } else if(value === "" && !isValid(grid, row, col, value)){
          setError("Please Enter Data")
        } else {
          setError("The grid is valid!"); // Display validation success message
        }
      }
    }
   
  };

  // Solve the Sudoku puzzle
  const handleSolve = () => {
    const solvedGrid = solveSudoku(grid);
    if (!solvedGrid) {
      setGrid(solvedGrid); // Only update if a solution is found
      setError("This Sudoku puzzle is solved");
    } else {
      setError("This Sudoku puzzle cannot be solved!");
    }
  };

  // Reset the grid to its initial empty state
  const handleReset = () => {
    setGrid(initialGrid);
    setError("");
  };

  return (
    <div className="app bg-dark p-5 m-3">
      <h1 className='text-white'>Sudoku Solver</h1>
      <SudokuGrid grid={grid} onInputChange={handleInputChange} />
      <div className="controls">
        <button className='btn btn-primary me-2' onClick={validateGrid}>Validate</button>
        <button className='btn btn-success me-2' onClick={handleSolve}>Solve</button>
        <button className='btn btn-warning' onClick={handleReset}>Reset</button> {/* Reset button */}
      </div>
      {error && <p className="error">{error}</p>} {/* Display error messages */}
    </div>
  );
}

export default App;
