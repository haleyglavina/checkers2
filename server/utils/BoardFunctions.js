const tileIndex = (i, j, boardSize) => {
  return (i * boardSize) + j;
}

/*
// Define tiles with start of game checkers arrangement
*/
const resetBoard = (boardSize) => {
  let tile = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker, king]
      if (i <= (boardSize / 3) && !getColor([i, j]))
        tile.push({i, j, hasChecker: 1, king: false});
      
      else if (i >= (boardSize - (boardSize / 3) - 1) && !getColor([i, j])) 
        tile.push({i, j, hasChecker: -1, king: false});
      
      else 
        tile.push({i, j, hasChecker: null, king: false});
    }
  }
  return tile;
}

/*
// Determines what color a tile will be
*/
const getColor = (coord) => {
  let i = coord[0]
  let j = coord[1]

  if (((i % 2 === 0) && (j % 2 === 0)) | ((i % 2 === 1) && (j % 2 === 1)))
    return 0;
  return 1;
}

/*
// Check if proposed checker movement is legal
*/
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

/*
// Check if proposed checker move larger than an adjacent diagonal is legal
*/
const isBigMoveValid = (tiles, oldCoord, newCoord, boardSize) => {
  // console.log("checking isBigMoveValid on the coords from", oldCoord, "to", newCoord)

  let oldTile = tiles[(oldCoord[0] * boardSize) + oldCoord[1]];

  let fwdDirection = oldTile.hasChecker;
  let iDirection = newCoord[0] > oldCoord[0] ? 1 : -1;
  let jDirection = newCoord[1] > oldCoord[1] ? 1 : -1;
  let iChangeValid = newCoord[0] === (oldCoord[0] + (2 * fwdDirection));
  let jChangeValid = ((newCoord[1] === (oldCoord[1] + 2)) || (newCoord[1] === (oldCoord[1] - 2)));
  let opponentCoord = [oldCoord[0] + fwdDirection, oldCoord[1] + jDirection];
  let capturesOpponent = false;

  if (oldTile.king) {
    // console.log("check move logic for a king")
    iChangeValid = ((newCoord[0] === (oldCoord[0] + 2)) || (newCoord[0] === (oldCoord[0] - 2)));
    opponentCoord = [ oldCoord[0] + iDirection, oldCoord[1] + jDirection ];
    iChangeValid = ((newCoord[0] === (oldCoord[0] + 2)) || (newCoord[0] === (oldCoord[0] - 2)));
    let opponentTile = tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]];
    capturesOpponent = (opponentTile.hasChecker === (-1 * oldTile.hasChecker));
  } else {
    // console.log("check move logic for a pawn")
    opponentCoord = [oldCoord[0] + fwdDirection, oldCoord[1] + jDirection];
    capturesOpponent = (fwdDirection === 1 
      ? (tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]].hasChecker === -1) 
      : (tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]].hasChecker === 1));
  }

  // SINGLES
  // Moving a single in its forward direction by 2 is legal if it captures opponent
  if (!oldTile.king) {
    if (!(iChangeValid & jChangeValid & capturesOpponent))
      return false; 
  }

  // KINGS
  /// Moving a king in either direction by 2 is legal if it captures opponent
  else {
    iChangeValid = ((newCoord[0] === (oldCoord[0] + 2)) || (newCoord[0] === (oldCoord[0] - 2)));

    if (!(iChangeValid & jChangeValid & capturesOpponent))
      return false;
  }

  return true;

}
/*
// Removes an opponent's checker from the board
*/
const moveCapturesOpponent = (tiles, oldCoord, newCoord, boardSize, updateScore) => {

  let fwdDirection = tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker;
  let jDirection = newCoord[1] > oldCoord[1] ? 1 : -1;
  let opponentCoord = [oldCoord[0] + fwdDirection, oldCoord[1] + jDirection];

  // SINGLES
  // remove opponent
  // tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]] = {
  //   i: opponentCoord[0], 
  //   j: opponentCoord[1], 
  //   hasChecker: null,
  //   king: false
  // };

  // Remove opponent from board
  let iDirection = newCoord[0] > oldCoord[0] ? 1 : -1;
  opponentCoord = [ oldCoord[0] + iDirection, oldCoord[1] + jDirection ];
  console.log("removing opponentCoord:", opponentCoord);
  tiles[(opponentCoord[0] * boardSize) + opponentCoord[1]] = {
    i: opponentCoord[0], 
    j: opponentCoord[1], 
    hasChecker: null,
    king: false
  };

  // increment point
  let currPlayer = tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker;
  updateScore(currPlayer === 1 ? [1, 0] : [0, 1])

  return tiles;
}

/*
// Moves a checker from oldCoord to newCoord, returns updated tiles array
*/
const moveChecker = (tiles, oldCoord, newCoord, boardSize, updateScore) => {

  if (isMoveValid(tiles, oldCoord, newCoord, boardSize)) {
    console.log("valid small move");
  } else if (isBigMoveValid(tiles, oldCoord, newCoord, boardSize)) {
    tiles = moveCapturesOpponent(tiles, oldCoord, newCoord, boardSize, updateScore);
    console.log("valid big move");
  } else {
    console.log("invalid move");
    return {isValidMove: false, tiles};
  }

  tiles[(newCoord[0] * boardSize) + newCoord[1]] = {
    i: newCoord[0], 
    j: newCoord[1], 
    hasChecker: tiles[(oldCoord[0] * boardSize) + oldCoord[1]].hasChecker,
    king: isKing(tiles, oldCoord, newCoord, boardSize)
  };

  tiles[(oldCoord[0] * boardSize) + oldCoord[1]] = {
    i: oldCoord[0], 
    j: oldCoord[1], 
    hasChecker: null,
    king: false
  };

  // console.log("returned tiles:", tiles);
  return {isValidMove: true, newTiles: tiles};
}

/*
// Returns true if a piece is already a king or should become one
*/
const isKing = (tiles, oldCoord, newCoord, boardSize) => {
  let oldTile = tiles[(oldCoord[0] * boardSize) + oldCoord[1]];

  // if checker is already a king, return true
  if (oldTile.king)
    return true;

  // conditions to become a king:
  // if hasChecker is 1 (Chrome piece) and its new position is i=boardSize-1
  if ((oldTile.hasChecker === 1) & (newCoord[0] === (boardSize - 1)))
    return true;
  // if hasChecker is -1 (IE piece) and its new position is i=0
  if ((oldTile.hasChecker === -1) & (newCoord[0] === 0))
    return true;

  return false;
}

/*
// Check if current player cannot make any move. If so, current player has lost
// Returns [if a player won, which player won]
*/
const checkForWin = (tiles, currPlayer, boardSize) => {
  // console.log("in check for win function");

  let nextPlayer = currPlayer * -1;
  // console.log("nextPlayer:", nextPlayer);

  let winResult = [false, null];
  // loop thru tiles
    // when we're on a p1 tile, it's a pawn, and fwd i direction has a valid move possibility
    // break from loop

    // when we're on a p1 tile, it's a king, and either i direction has a valid move possibility
    // break from loop

  for (let i=0; i < tiles.length; i++) {
    let oldCoord = [tiles[i].i, tiles[i].j];

    if (tiles[i].hasChecker === nextPlayer) {
      // console.log("for the tile ", oldCoord, "we're checking the following moves:");
      // console.log(`[${tiles[i].i + (tiles[i].hasChecker)}, ${tiles[i].j + 1}]`);
      // console.log(`[${tiles[i].i + (tiles[i].hasChecker)}, ${tiles[i].j - 1}]`);
      // console.log(`[${tiles[i].i + (tiles[i].hasChecker * 2)}, ${tiles[i].j + 2}]`);
      // console.log(`[${tiles[i].i + (tiles[i].hasChecker * 2)}, ${tiles[i].j - 2}]`);
      // console.log(`[${tiles[i].i - (tiles[i].hasChecker)}, ${tiles[i].j + 1}]`);
      // console.log(`[${tiles[i].i - (tiles[i].hasChecker)}, ${tiles[i].j - 1}]`);
      // console.log(`[${tiles[i].i - (tiles[i].hasChecker * 2)}, ${tiles[i].j + 2}]`);
      // console.log(`[${tiles[i].i - (tiles[i].hasChecker * 2)}, ${tiles[i].j - 2}]`);


      if ( // Check fwd direction moves
        (isMoveValid(tiles, oldCoord, [tiles[i].i + (tiles[i].hasChecker), tiles[i].j + 1], boardSize)) | 
        (isMoveValid(tiles, oldCoord, [tiles[i].i + (tiles[i].hasChecker), tiles[i].j - 1], boardSize)) |
        (isBigMoveValid(tiles, oldCoord, [tiles[i].i + (tiles[i].hasChecker * 2), tiles[i].j + 2], boardSize)) |  
        (isBigMoveValid(tiles, oldCoord, [tiles[i].i + (tiles[i].hasChecker * 2), tiles[i].j - 2], boardSize)) | 
        // Check backward direction moves
        (isMoveValid(tiles, oldCoord, [tiles[i].i - (tiles[i].hasChecker), tiles[i].j + 1], boardSize)) | 
        (isMoveValid(tiles, oldCoord, [tiles[i].i - (tiles[i].hasChecker), tiles[i].j - 1], boardSize)) | 
        (isBigMoveValid(tiles, oldCoord, [tiles[i].i - (tiles[i].hasChecker * 2), tiles[i].j + 2], boardSize)) | 
        (isBigMoveValid(tiles, oldCoord, [tiles[i].i - (tiles[i].hasChecker * 2), tiles[i].j - 2], boardSize))) {
        console.log("found a valid move, so leave checkForWin function");
        return winResult;
      } else {
        console.log("a player won bc of no more valid moves");
        return [true, currPlayer];
      }
    }
  }

  return winResult;
}

module.exports = {
  tileIndex,
  resetBoard,
  getColor,
  // isMoveValid,
  // isBigMoveValid,
  // moveCapturesOpponent,
  moveChecker,
  // isKing,
  checkForWin
};