import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext';
import { Nav } from './styles';

function NavBar(props) {

  const { theme, setTheme } = useContext(ThemeContext);
  const [toggleOn, setToggleOn] = useState(theme === 'dark');

  const switchToggle = () => { 
    setToggleOn(!toggleOn);
    setTheme( (theme == 'light') ? 'dark' : 'light');
  }

  return (
    <Nav className="navbar">
      <p className="title">Battle of da Browsers 🔥</p>
      <div className={`toggle ${toggleOn ? 'toggle--on' : ''}`} onClick={switchToggle}>
        <p className="toggle__symbol toggle__symbol--dark">🌜</p>
        <p className="toggle__symbol toggle__symbol--light">🌞</p>
        <div className={`toggle__dial ${toggleOn ? 'toggle__dial--on' : ''}`}></div>
      </div>
    </Nav>
  );
}

export default NavBar;
