// Define tiles with no checkers on them
export const emptyBoard = (boardSize) => {
  let tileLi = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker]
      tileLi.push({i, j, hasChecker: null});
    }
  }
  return tileLi;
}

// Define tiles with start of game checkers arrangement
export const resetBoard = (boardSize) => {
  let tileLi = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // [x, y, hasChecker]
      if (i <= 1 && !getColor([i, j]))
        tileLi.push({i, j, hasChecker: 'chrome'});
      
      else if (i >= 4 && !getColor([i, j])) 
        tileLi.push({i, j, hasChecker: 'IE'});
      
      else 
        tileLi.push({i, j, hasChecker: ''});
    }
  }
  return tileLi;
}

// Determines what color a tile will be
export const getColor = (coord) => {
  let i = coord[0]
  let j = coord[1]

  if (((i % 2 == 0) && (j % 2 == 0)) | ((i % 2 == 1) && (j % 2 == 1)))
    return 0;
  return 1;
}