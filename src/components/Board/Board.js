import React, { useEffect, useState } from 'react';
import './Board.scss';
import Tile from '../Tile/Tile';
import { Component } from 'react';

let boardSize = 6;

function Board(props) {

  const [focusTile, setFocusTile] = useState(null);
  const [tiles, setTiles] = useState([])

  // Define tiles with no checkers on them
  const emptyBoard = () => {
    let tileLi = []
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        // [x, y, hasChecker]
        tileLi.push({i, j, hasChecker: null});
      }
    }
    setTiles(tileLi);
  }
  
  // Define tiles with start of game checkers arrangement
  const resetBoard = () => {
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
      console.log("set tiles");
      setTiles([...tileLi]);
  }

  useEffect(() => {
    console.log("hi");
    resetBoard();
  }, [])

  useEffect(() => {
    console.log("updated");
  })

  // Check if a tile is currently focused
  const isFocusTile = (coord) => {
    if (!focusTile) 
      return false;

    if ((focusTile[0] == coord[0]) && (focusTile[1] == coord[1]))
      return true;
  }

  // Determines what color a tile will be
  const getColor = (coord) => {
    console.log("coord in getColor:", coord)
    let i = coord[0]
    let j = coord[1]

    if (((i % 2 == 0) && (j % 2 == 0)) | ((i % 2 == 1) && (j % 2 == 1)))
      return 0;
    return 1;
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