import React, { useEffect, useState } from 'react';
import './Board.scss';
import Tile from '../Tile/Tile';
import { Component } from 'react';
import { emptyBoard, resetBoard, getColor, moveChecker } from '../../utils/BoardFunctions';

// Number of tiles per row/column
let boardSize = 8;

function Board(props) {

  const [focusTile, setFocusTile] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    setTiles(resetBoard(boardSize));

    // Determine size of the board
    if (window.innerWidth < window.innerHeight)
      setBoardWidth(window.innerWidth * 0.7);
    else
      setBoardWidth(window.innerHeight * 0.7);
    
  }, [])

  useEffect(() => {
    console.log("updated Board");
    console.log('board width: ', boardWidth);
  })

  // Check if a tile is currently focused
  const isFocusTile = (coord) => {
    if (!focusTile) 
      return false;

    if ((focusTile[0] === coord[0]) && (focusTile[1] === coord[1]))
      return true;
  }

  const tileClicked = (coord) => {
    // if no tile is focused yet, focus this tile
    if (!focusTile)
      setFocusTile(coord);

    // if focus tile already exists, move checker from focus tile to this coord
    else {
      setTiles(moveChecker(tiles, focusTile, coord, boardSize));
      setFocusTile(null);
    }
    // isFocusTile(coord) ? setFocusTile(null) : setFocusTile(coord);
  }

  return (
    <div className = "board" 
         style = {{width: `${boardSize * 88}px`, height: `${boardSize * 88}px`}}
        //  onMouseDown = {startTileChosen}
        //  onMouseUp = {endTileChosen}
    >
      {tiles.map((tile, i) => {
        return <Tile 
                key={i}
                coord = {[tile.i, tile.j]}
                color = {getColor([tile.i, tile.j])}
                hasChecker = {tile.hasChecker}
                isFocusTile = {isFocusTile}
                setFocusTile = {setFocusTile}
                tileClicked = {tileClicked}
               /> 
      })}
    </div>
  );
}

export default Board;