import React from 'react';
import './HomePage.scss';
import Game from '../Game/Game';
import NavBar from '../NavBar/NavBar';
import ThemeContext from '../../utils/ThemeContext';

function HomePage(props) {

  return (
    <ThemeContext.Provider value='light'>
      <main>
        <NavBar />
        <h1>Checkers</h1>
        <Game />
      </main>
    </ThemeContext.Provider>
  );
}

export default HomePage;