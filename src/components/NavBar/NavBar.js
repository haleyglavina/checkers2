import React, { useContext, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext';
import Toggle from '../Toggle/Toggle';
import { Nav } from './styles';

function NavBar({ sameScreen, setSameScreen }) {

  const { theme, setTheme } = useContext(ThemeContext);

  // for switching light/dark theme
  const switchTheme = () => { 
    setTheme( (theme == 'light') ? 'dark' : 'light');
  }

  // for switching screens together/separate mode
  const switchScreenMode = () => { 
    setSameScreen(!sameScreen);
  }

  return (
    <Nav className="navbar">
      <p className="title">Battle of da Browsers 🔥</p>
      <Toggle toggleAction={switchTheme} initialState={theme === 'dark'} />
      <Toggle toggleAction={switchScreenMode} initialState={false} />
    </Nav>
  );
}

export default NavBar;
