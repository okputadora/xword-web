export const buildPlayableBoard = board => {
  let currentNumber = 1;
  const downClueTracker = {};
  const playableBoard = board.map((row, rowCount) => {
    let acrossClue = 1;
    let downClue = 1;
    return row.map((col, colCount) => {
      let number = null;
      if (col === '#BlackSquare#') {
        return { answer: col };
      }
      // deduce clues associated with this cell
      if (rowCount === 0) {
        downClueTracker[colCount] = currentNumber;
      }
      if (colCount === 0) {
        acrossClue = currentNumber;
      }
      if (row[colCount - 1] === '#BlackSquare#') {
        acrossClue = currentNumber;
      }
      if (
        board[rowCount - 1] &&
        board[rowCount - 1][colCount] === '#BlackSquare#'
      ) {
        downClueTracker[colCount] = currentNumber;
      }

      downClue = downClueTracker[colCount];
      // Check if this cell gets a number
      if (
        rowCount === 0 ||
        colCount === 0 ||
        row[colCount - 1] === '#BlackSquare#' ||
        board[rowCount - 1][colCount] === '#BlackSquare#'
      ) {
        number = currentNumber;
        currentNumber += 1;
      }

      // acrossClue = currentNuber;
      return { guess: '', answer: col, number, clues: [acrossClue, downClue] };
    });
  });
  // let rowCounter = 0;
  // for (let row of playableBoard) {
  //   let colCounter = 0;
  //   for (let col of row) {
  //     let wordBegAcross = searchForBoundaryCell(
  //       rowCounter,
  //       colCounter,
  //       "across",
  //       "DECREMENT",
  //       playableBoard
  //     );
  //     let wordBegDown = searchForBoundaryCell(
  //       rowCounter,
  //       colCounter,
  //       "down",
  //       "DECREMENT",
  //       playableBoard
  //     );
  //     playableBoard[rowCounter][colCounter].acrossClue = `${wordBegAcross +
  //       1}A`;
  //     playableBoard[rowCounter][colCounter].downClue = `${wordBegDown + 1}D`;
  //     colCounter++;
  //   }
  //   rowCounter++;
  // }
  // console.log(playableBoard);
  return playableBoard;
};

// Take the current position, direction, keypressed and finds the next cell in that row or col that isn't a blacksquare.
// If it reaches the end of the board it goes back to the beginning

export const searchForValidCell = (row, col, direction, key, board) => {
  let validCellFound;
  while (!validCellFound) {
    if (direction === 'across') {
      if (key === 'ArrowRight') {
        col += 1;
        if (!board[row][col]) {
          col = 0;
        }
      } else {
        col -= 1;
        if (!board[row][col]) {
          col = board[0].length - 1;
        }
      }
    } else if (direction === 'down') {
      if (key === 'ArrowDown') {
        row += 1;
        if (!board[row]) {
          row = 0;
        }
      } else {
        row -= 1;
        if (!board[row]) {
          row = board.length - 1;
        }
      }
    }
    if (board[row][col] === '#BlackSquare#') {
      validCellFound = false;
    } else {
      validCellFound = true;
      return [row, col];
    }
  }
};

// Search for end or beginnging of a word
// board = playableBoard
export const searchForBoundaryCell = (row, col, direction, incOrDec, board) => {
  let cell;
  let endCounter = direction === 'across' ? col : row;
  let currentCell;
  while (!cell) {
    if (direction === 'across') {
      currentCell = board[row][endCounter];
    } else {
      try {
        currentCell = board[parseInt(endCounter, 10)][col];
      } catch (err) {
        currentCell = undefined;
      }
    }
    if (!currentCell || currentCell === '#BlackSquare#') {
      cell = incOrDec === 'INCREMENT' ? endCounter - 1 : endCounter + 1;
      return cell;
    }
    if (incOrDec === 'INCREMENT') {
      endCounter += 1;
    } else {
      endCounter -= 1;
    }
  }
};
