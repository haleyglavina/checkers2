import React from 'react';
import './HomePage.scss';
import Game from '../Game/Game';

function HomePage(props) {

  return (
    <main>
      <h1>Checkers</h1>
      <Game />
    </main>
  );
}

export default HomePage;