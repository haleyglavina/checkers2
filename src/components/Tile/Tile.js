import React, { useEffect, useState } from 'react';
import './Tile.scss';

function Tile({color, coord, isFocusTile, setFocusTile}) {

  const toggleFocus = () => {
    console.log("tile clicked:", coord[0], coord[1]);
    console.log("is this a focus tile?", isFocusTile(coord));

    if (!color) {
      setFocusTile(null);
      return;
    }

    isFocusTile(coord) ? setFocusTile(null) : setFocusTile(coord);
  }


  return (
    <div className={`tile 
                    ${color ? 'tile--light' : 'tile--dark'} 
                    ${isFocusTile(coord) ? 'tile--focus' : ''}`}
        onClick={toggleFocus}>
      
    </div>
  );
}

export default Tile;