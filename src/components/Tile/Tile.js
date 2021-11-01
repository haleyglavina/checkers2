import React, { useEffect, useState } from 'react';
import './Tile.scss';

function Tile({color, coord, isFocusTile, setFocusTile}) {

  // const [isFocused, setIsFocused] = useState(isFocusTile(coord));

  const toggleFocus = () => {
    console.log("tile clicked:", coord[0], coord[1]);
    console.log("is this a focus tile?", isFocusTile(coord));

    let i, j = coord
    
    if (((i % 2 == 0) && (j % 2 == 0)) | ((i % 2 == 1) && (j % 2 == 1))) {
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