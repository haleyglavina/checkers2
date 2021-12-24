import React, { useEffect, useState } from 'react';
import './Tile.scss';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';
import crown from '../../assets/crown.svg';
import { TileContainer, CheckerPiece } from './styles';

function Tile({color, coord, isFocusTile, hasChecker, tileClicked, isKing, boardSize}) {

  const toggleFocus = () => {
    tileClicked(coord);
  }

  return (
    <TileContainer 
        color={color} 
        isFocusTile={isFocusTile(coord)}
        onClick={toggleFocus}
        boardSize = {boardSize}
    >
      <p className="label">{`${coord[0]}, ${coord[1]}`}</p> 
      {(hasChecker & isKing) ? <img className="crown" src={crown} /> : ''}
      {hasChecker ? <CheckerPiece src={hasChecker == 1 ? chromeLogo : ieLogo} /> : ''}
    </TileContainer>
  );
}

export default Tile;