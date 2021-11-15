// Define tiles with no checkers on them
export const emptyBoard = (boardSize) => {
  let tile = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker]
      tile.push({i, j, hasChecker: null});
    }
  }
  return tile;
}

// Define tiles with start of game checkers arrangement
export const resetBoard = (boardSize) => {
  let tile = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker]
      if (i <= (boardSize / 3) && !getColor([i, j]))
        tile.push({i, j, hasChecker: 1, king: false});
      
      else if (i >= (boardSize - (boardSize / 3) - 1) && !getColor([i, j])) 
        tile.push({i, j, hasChecker: 2, king: false});
      
      else 
        tile.push({i, j, hasChecker: null, king: false});
    }
  }
  return tile;
}

// Determines what color a tile will be
export const getColor = (coord) => {
  let i = coord[0]
  let j = coord[1]

  if (((i % 2 === 0) && (j % 2 === 0)) | ((i % 2 === 1) && (j % 2 === 1)))
    return 0;
  return 1;
}

// Check if proposed checker movement is legal
const isMoveValid = (tiles, oldCoord, newCoord, boardSize) => {
  // oldCoord must not equal new coord
    if ((oldCoord[0] === newCoord[0]) & (oldCoord[1] === newCoord[1]))
      return false;

  // oldCoord must contain a checker
  if (!tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker)
    return false;

  // newCoord must contain no checker
  if (tiles[(newCoord[0] * boardSize) + newCoord[1]].hasChecker)
    return false;

  // SINGLES
  // Moving a single in its forward direction by 1 is legal
  let fwdDirection = tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker;
  let iChangeValid = fwdDirection === 1 ? (newCoord[0] === (oldCoord[0] + 1)) : (newCoord[0] === (oldCoord[0] - 1));
  let jChangeValid = ((newCoord[1] === (oldCoord[1] + 1)) || (newCoord[1] === (oldCoord[1] - 1)));

  if (!tiles[(oldCoord[0] * boardSize) + oldCoord[1]].king) {
    if (!(iChangeValid & jChangeValid))
      return false;

  }

  // KINGS
  // Moving a king in its forward or backward direction by 1 is legal
  else {
    iChangeValid = ((newCoord[0] === (oldCoord[0] + 1)) || (newCoord[0] === (oldCoord[0] - 1)));

    if (!(iChangeValid & jChangeValid))
      return false;
  }

  return true;
}

// Check if proposed checker move larger than an adjacent diagonal is legal
const isBigMoveValid = (tiles, oldCoord, newCoord, boardSize) => {

  let fwdDirection = tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker;
  let iChangeValid = fwdDirection === 1 ? (newCoord[0] === (oldCoord[0] + 2)) : (newCoord[0] === (oldCoord[0] - 2));
  let jChangeValid = ((newCoord[1] === (oldCoord[1] + 2)) || (newCoord[1] === (oldCoord[1] - 2)));
  let opponentCoord = [Math.abs((oldCoord[0] - newCoord[0])), Math.abs((oldCoord[1] - newCoord[1]))];
  let capturesOpponent = fwdDirection === 1 ? (tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]].hasChecker === 2) : (tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]].hasChecker === 1);

  console.log("opponent coord: ", opponentCoord)

  // SINGLES
  // Moving a single in its forward direction by 2 is legal if it captures opponent
  if (!tiles[(oldCoord[0] * boardSize) + oldCoord[1]].king) {
    if (!(iChangeValid & jChangeValid & capturesOpponent))
      return false;
  }

  // KINGS
  /// Moving a single in either direction by 2 is legal if it captures opponent
  else {
    iChangeValid = ((newCoord[0] === (oldCoord[0] + 2)) || (newCoord[0] === (oldCoord[0] - 2)));

    console.log("")

    if (!(iChangeValid & jChangeValid & capturesOpponent))
      return false;
  }

  return true;

}

// Removes an opponent's checker from the board
const moveCapturesOpponent = (tiles, oldCoord, newCoord, boardSize, updateScore) => {
  let opponentCoord = [Math.abs((oldCoord[0] - newCoord[0])), Math.abs((oldCoord[1] - newCoord[1]))];

  console.log("opponent coord we're removing:", opponentCoord);
  // remove opponent
  tiles[opponentCoord] = {
    i: oldCoord[0], 
    j: oldCoord[1], 
    hasChecker: null,
    king: false
  };

  // increment point
  let currentPlayer = tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker;
  updateScore(currentPlayer === 1 ? [1, 0] : [0, 1])

}

// Moves a checker from oldCoord to newCoord, returns updated tiles array
export const moveChecker = (tiles, oldCoord, newCoord, boardSize, updateScore) => {

  if (isMoveValid(tiles, oldCoord, newCoord, boardSize)) {
    console.log("valid small move");
  } else if (isBigMoveValid(tiles, oldCoord, newCoord, boardSize)) {
    moveCapturesOpponent(tiles, oldCoord, newCoord, boardSize, updateScore);
    console.log("valid big move");
  } else {
    console.log("invalid move");
    return tiles;
  }

  tiles[(newCoord[0] * boardSize) + newCoord[1]] = {
    i: newCoord[0], 
    j: newCoord[1], 
    hasChecker: tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker,
    king: tiles[(oldCoord[0] * boardSize) + oldCoord[1]].king
  };

  tiles[(oldCoord[0] * boardSize) + oldCoord[1]] = {
    i: oldCoord[0], 
    j: oldCoord[1], 
    hasChecker: null,
    king: false
  };

  // console.log("tiles after: ", tiles);
  return tiles;
}