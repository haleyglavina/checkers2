import React from 'react';
import './HomePage.scss';
import Board from '../Board/Board';

function HomePage(props) {
  return (
    <main>
      <h1>Checkers</h1>
      <Board />
    </main>
  );
}

export default HomePage;