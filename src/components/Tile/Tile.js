import React, { useEffect, useState } from 'react';
import './Tile.scss';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';

function Tile({color, coord, isFocusTile, setFocusTile, hasChecker, tileClicked}) {

  const toggleFocus = () => {
    tileClicked(coord);
  }

  return (
    <div className={`tile 
                    ${color ? 'tile--light' : 'tile--dark'} 
                    ${isFocusTile(coord) ? 'tile--focus' : ''}`}
        onClick={toggleFocus}
    >
      <p className="tile__label">{`${coord[0]}, ${coord[1]}`}</p> 
      {hasChecker ? <img className="tile__checker" src={hasChecker == 1 ? chromeLogo : ieLogo}></img> : ''}
    </div>
  );
}

export default Tile;