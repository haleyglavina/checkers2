import React, { useEffect, useState } from 'react';
import './Board.css';
import Tile from '../Tile/Tile';
import { Component } from 'react';

let boardSize = 6;
let tiles = []
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    tiles.push([i, j]);
  }
}

function Board(props) {

  const [focusTile, setFocusTile] = useState(null);

  // Check if a tile is currently focused
  const isFocusTile = (coord) => {
    if (!focusTile) 
      return false;

    if ((focusTile[0] == coord[0]) && (focusTile[1] == coord[1]))
      return true;
  }

  // Determines what color a tile will be
  const getColor = (coord) => {
    let i = coord[0]
    let j = coord[1]

    if (((i % 2 == 0) && (j % 2 == 0)) | ((i % 2 == 1) && (j % 2 == 1)))
      return 0;
    return 1;
  }

  return (
    <div className="board">
      {tiles.map((coord, i) => {
        return <Tile 
                key={i}
                coord = {coord}
                color = {getColor(coord)}
                isFocusTile = {isFocusTile}
                setFocusTile = {setFocusTile}
               /> 
      })}
    </div>
  );
}

export default Board;