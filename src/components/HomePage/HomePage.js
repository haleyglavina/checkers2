import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import Game from '../Game/Game';
import NavBar from '../NavBar/NavBar';
import ThemeContext from '../../utils/ThemeContext';

function HomePage(props) {

  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      <main>
        <NavBar />
        <h1>Checkers</h1>
        <Game />
      </main>
    </ThemeContext.Provider>
  );
}

export default HomePage;