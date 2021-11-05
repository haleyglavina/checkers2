import React, { useEffect, useState } from 'react';
import './Tile.scss';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';

function Tile({color, coord, isFocusTile, setFocusTile, hasChecker}) {

  // const [hasChecker, setHasChecker] = useState(hasChecker);

  const toggleFocus = () => {
    console.log("tile clicked:", coord[0], coord[1]);
    // console.log("is this a focus tile?", isFocusTile(coord));
    console.log("hasChecker is: ", hasChecker);

    if (color) {
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
      {hasChecker ? <img className="tile__checker" src={hasChecker == 'chrome' ? chromeLogo : ieLogo}></img> : ''}
    </div>
  );
}

export default Tile;