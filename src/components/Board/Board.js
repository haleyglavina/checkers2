import React, { useEffect, useState } from 'react';
import { GameBoard } from './styles';
import Tile from '../Tile/Tile';
// import { Component } from 'react';
import { resetBoard, getColor, moveChecker } from '../../utils/BoardFunctions';

// Number of tiles per row/column
let boardSize = 8;

function Board({updateScore, game, score}) {

  const [focusTile, setFocusTile] = useState(null);
  const [tiles, setTiles] = useState([]);
  const maxPoints = 12; // Change this to a function of boardSize !
  // const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    setTiles(resetBoard(boardSize));

    // Determine size of the board
    // if (window.innerWidth < window.innerHeight)
    //   setBoardWidth(window.innerWidth * 0.7);
    // else
    //   setBoardWidth(window.innerHeight * 0.7);
    
  }, [])

  // Check if a tile is currently focused
  const isFocusTile = (coord) => {
    if (!focusTile) 
      return false;

    if ((focusTile[0] === coord[0]) && (focusTile[1] === coord[1]))
      return true;
  }

  const tileClicked = (coord) => {
    // if no tile is focused yet 
    // and this tile contains a checker
    // and its this player's turn, focus this tile
    let tile = tiles[(coord[0] * boardSize) + coord[1]];

    if (!focusTile 
        && tile.hasChecker
        && (((game.gameState === 'p1Turn') && (tile.hasChecker === 1)) 
            || ((game.gameState === 'p2Turn') && (tile.hasChecker === -1)))) {
      setFocusTile(coord);
    }
      
    // if no tile is focused yet and this tile doesn't contain checker, do nothing
    else if (!focusTile && !tiles.hasChecker) {
      return;
    }

    // if focus tile already exists, move checker from focus tile to this coord
    else {
      const {isValidMove, newTiles} = moveChecker(tiles, focusTile, coord, boardSize, updateScore);     
      setFocusTile(null);

      // If the move was valid, determine if player just won or switch the turn
      if (isValidMove) {
        setTiles(newTiles);
        let newGameState = game.gameState;
        if (game.gameState === 'p1Turn') {
          if (score[0] >= maxPoints)
            newGameState = 'p1Won';
          newGameState = 'p2Turn';
        } else {
          if (score[1] >= maxPoints)
            newGameState = 'p2Won';
          newGameState = 'p1Turn';
        }
        console.log("changing game state to:", newGameState);
        game.setGameState(newGameState);
      }
    }
  }

  return (
    <GameBoard boardSize={boardSize}>
      {tiles.map((tile, i) => {
        return <Tile 
                key={i}
                coord = {[tile.i, tile.j]}
                color = {getColor([tile.i, tile.j])}
                hasChecker = {tile.hasChecker}
                isKing = {tile.king}
                isFocusTile = {isFocusTile}
                tileClicked = {tileClicked}
               /> 
      })}
    </GameBoard>
  );
}

export default Board;