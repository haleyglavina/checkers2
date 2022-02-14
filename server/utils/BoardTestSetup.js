const boardFunctions = require('./BoardFunctions');

/*
// Make pawn and king objects  
*/
const makeP1Pawn = (i,j) => {
  return {i, j, hasChecker: 1, king: false};
}

const makeP2Pawn = (i,j) => {
  return {i, j, hasChecker: -1, king: false};
}

const makeP1King = (i,j) => {
  return {i, j, hasChecker: 1, king: true};
}

const makeP2King = (i,j) => {
  return {i, j, hasChecker: -1, king: true};
}

/*
// Define tiles with no checkers on them
*/
const emptyBoard = (boardSize) => {
  let tile = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker]
      tile.push({i, j, hasChecker: null});
    }
  }
  return tile;
}

/*
// Define tiles where p1 pawns remain and cant move, so p2 wins
// Assumes a boardSize of 8
*/
const pawnCantMove = (i, j) => {
  let tiles = emptyBoard(8);

  tiles[boardFunctions.tileIndex(3,3,8)] = makeP1Pawn(3,3);
  tiles[boardFunctions.tileIndex(4,2,8)] = makeP2Pawn(4,2);
  tiles[boardFunctions.tileIndex(6,0,8)] = makeP2Pawn(6,0);
  tiles[boardFunctions.tileIndex(4,4,8)] = makeP2Pawn(4,4);
  tiles[boardFunctions.tileIndex(5,5,8)] = makeP2Pawn(5,5);

  return tiles;
}

/*
// Define tiles where p1 king remain and cant move, so p2 wins
// Assumes a boardSize of 8
*/
const kingCantMove = (i, j) => {
  let tiles = emptyBoard(8);

  tiles[boardFunctions.tileIndex(3,3,8)] = makeP1King(3,3);
  tiles[boardFunctions.tileIndex(4,2,8)] = makeP2Pawn(4,2);
  tiles[boardFunctions.tileIndex(6,0,8)] = makeP2Pawn(6,0);
  tiles[boardFunctions.tileIndex(4,4,8)] = makeP2Pawn(4,4);
  tiles[boardFunctions.tileIndex(5,5,8)] = makeP2Pawn(5,5);

  tiles[boardFunctions.tileIndex(2,2,8)] = makeP2Pawn(2,2);
  tiles[boardFunctions.tileIndex(2,4,8)] = makeP2Pawn(2,4);
  tiles[boardFunctions.tileIndex(4,4,8)] = makeP2Pawn(4,4);
  tiles[boardFunctions.tileIndex(5,5,8)] = makeP2Pawn(5,5);

  return tiles;
}

module.exports = { 
  emptyBoard,
  pawnCantMove,
  kingCantMove
};