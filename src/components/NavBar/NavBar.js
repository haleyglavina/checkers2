import './NavBar.scss';
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext';

function NavBar(props) {

  const { theme, setTheme } = useContext(ThemeContext);
  const [toggleOn, setToggleOn] = useState(theme === 'dark'); // false

  const switchToggle = () => { 
    setToggleOn(!toggleOn);
    setTheme( (theme == 'light') ? 'dark' : 'light')
  }

  return (
    <nav className="navbar">
      <p className="navbar__title">Battle of da Browsers</p>
      <div className={`toggle ${toggleOn ? 'toggle--on' : ''}`} onClick={switchToggle}>
        <p className="toggle__symbol toggle__symbol--dark">🌜</p>
        <p className="toggle__symbol toggle__symbol--light">🌞</p>
        <div className={`toggle__dial ${toggleOn ? 'toggle__dial--on' : ''}`}></div>
      </div>
    </nav>
  );
}

export default NavBar;
