import React, { useEffect, useState } from 'react';
import './Board.scss';
import Tile from '../Tile/Tile';
import { Component } from 'react';
import { emptyBoard, resetBoard, getColor } from '../../utils/BoardFunctions';

let boardSize = 6;

function Board(props) {

  const [focusTile, setFocusTile] = useState(null);
  const [tiles, setTiles] = useState([])

  useEffect(() => {
    setTiles(resetBoard(boardSize));
  }, [])

  useEffect(() => {
    console.log("updated Board");
  })

  // Check if a tile is currently focused
  const isFocusTile = (coord) => {
    if (!focusTile) 
      return false;

    if ((focusTile[0] == coord[0]) && (focusTile[1] == coord[1]))
      return true;
  }

  return (
    <div className="board">
      {tiles.map((tile, i) => {
        return <Tile 
                key={i}
                coord = {[tile.i, tile.j]}
                color = {getColor([tile.i, tile.j])}
                hasChecker = {tile.hasChecker}
                isFocusTile = {isFocusTile}
                setFocusTile = {setFocusTile}
               /> 
      })}
    </div>
  );
}

export default Board;