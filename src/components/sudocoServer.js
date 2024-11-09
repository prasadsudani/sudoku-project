// Check if placing `num` at position (row, col) is valid in `grid`
export const isValid = (grid, row, col, num) => {
  // Check if `num` exists in the row or column
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  // Calculate the starting coordinates of the 3x3 sub-grid
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  // Check the 3x3 sub-grid for `num`
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true; // Return true if `num` placement is valid
};

// Solve the Sudoku puzzle using backtracking
export const solveSudoku = (grid) => {
  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Find an empty cell (denoted by 0)
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            // Check if placing `num` is valid
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num; // Place `num`

              // Recursively try to solve the next cell
              if (solve()) return true;

              // Backtrack if no solution is found
              grid[row][col] = 0;
            }
          }
          return false; // Return false if no number can be placed in this cell
        }
      }
    }
    return true; // All cells are filled and valid, so the puzzle is solved
  };

  // Create a copy of the grid to avoid mutating the original grid
  const gridCopy = grid.map((row) => row.slice());

  // Return the solved grid or null if unsolvable
  return solve() ? gridCopy : null;
};
