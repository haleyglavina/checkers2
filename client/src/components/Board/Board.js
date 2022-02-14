import React, { useEffect, useState } from 'react';
import { GameBoard } from './styles';
import Tile from '../Tile/Tile';
// import { Component } from 'react';
import { resetBoard, getColor, moveChecker, checkForWin } from '../../utils/BoardFunctions';
import { emptyBoard, pawnCantMove, kingCantMove } from '../../utils/BoardTestSetup';
import axios from "axios";

// Number of tiles per row/column
let boardSize = 8;

function Board({updateScore, game, score, sameScreen, playerView}) {

  const [focusTile, setFocusTile] = useState(null);
  const [tiles, setTiles] = useState([]);
  // const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    // setTiles(resetBoard(boardSize));
    // setTiles(emptyBoard(boardSize));
    // setTiles(pawnCantMove());
    setTiles(kingCantMove());
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
      let {isValidMove, newTiles} = moveChecker(tiles, focusTile, coord, boardSize, updateScore);
      // if (isValidMove) {
      //   axios
      //     .get('http://localhost:8080/warehouses/')
      //     .then(res => {

      //     })
      // }

      setFocusTile(null);

      // If the move was valid, determine if player just won or switch the turn
      if (isValidMove) {
        setTiles(newTiles);
        let newGameState = game.gameState;

        let p1CheckersRemaining = newTiles.filter(tile => tile.hasChecker === 1).length;
        let p2CheckersRemaining = newTiles.filter(tile => tile.hasChecker === -1).length;
        console.log("p1 remaining:", p1CheckersRemaining);
        console.log("p2 remaining:", p2CheckersRemaining);

        // If the current player just eliminated the last of their opponent's checkers, current player wins
        if (newGameState === 'p1Turn' & (p2CheckersRemaining === 0)) {
          newGameState = 'p1Won';
        } else if (newGameState === 'p2Turn' & (p1CheckersRemaining === 0)) {
          newGameState = 'p2Won';
        }

        // If current player cannot make any moves they have lost
        if ((newGameState === 'p1Turn') || (newGameState === 'p2Turn')) {
          let winResult = checkForWin(newTiles, newGameState === 'p1Turn' ? 1 : -1, boardSize);
          console.log("winResult received:", winResult);
          if (winResult[0])
            newGameState = winResult[1] === 1 ? 'p1Won' : 'p2Won';
        }

        // If no player has won yet, switch turns
        if (newGameState === 'p1Turn')
          newGameState = 'p2Turn';
        else if (newGameState === 'p2Turn')
          newGameState = 'p1Turn';

        console.log("changing game state to:", newGameState);
        game.setGameState(newGameState);
      }
    }
  }

  return (
    <GameBoard boardSize={boardSize} playerView={sameScreen ? 1 : playerView}>
      {tiles.map((tile, i) => {
        return <Tile 
                key={i}
                coord = {[tile.i, tile.j]}
                color = {getColor([tile.i, tile.j])}
                hasChecker = {tile.hasChecker}
                isKing = {tile.king}
                isFocusTile = {isFocusTile}
                tileClicked = {tileClicked}
                boardSize = {boardSize}
               /> 
      })}
    </GameBoard>
  );
}

export default Board;