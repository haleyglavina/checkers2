import './NavBar.scss';
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext';

function NavBar(props) {

  let theme = useContext(ThemeContext);
  const [toggleOn, setToggleOn] = useState(theme == 'dark'); // false

  const switchToggle = () => { 
    setToggleOn(!toggleOn);
    
  }

  return (
    <nav className="navbar">
      <p className="navbar__title">Checkmate in {`${theme}`} mode</p>
      <div className={`toggle ${toggleOn ? 'toggle--on' : ''}`} onClick={switchToggle}>
        <div className={`toggle__dial ${toggleOn ? 'toggle__dial--on' : ''}`}></div>
      </div>
    </nav>
  );
}

export default NavBar;
