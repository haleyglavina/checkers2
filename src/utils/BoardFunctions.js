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
        tile.push({i, j, hasChecker: 1});
      
      else if (i >= (boardSize - (boardSize / 3) - 1) && !getColor([i, j])) 
        tile.push({i, j, hasChecker: 2});
      
      else 
        tile.push({i, j, hasChecker: null});
    }
  }
  return tile;
}

// Determines what color a tile will be
export const getColor = (coord) => {
  let i = coord[0]
  let j = coord[1]

  if (((i % 2 == 0) && (j % 2 == 0)) | ((i % 2 == 1) && (j % 2 == 1)))
    return 0;
  return 1;
}

// Moves a checker from oldCoord to newCoord, returns updated tiles array
export const moveChecker = (tiles, oldCoord, newCoord, boardSize) => {
  tiles[(newCoord[0] * boardSize) + newCoord[1]] = tiles[(oldCoord[0] * boardSize) + oldCoord[1]];
  tiles[(oldCoord[0] * boardSize) + oldCoord[1]] = {i: oldCoord[0], j: oldCoord[1], hasChecker: null};

  return tiles;
}