import React, { useEffect, useState } from 'react';
import './Game.scss';
import Board from '../Board/Board';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';

function Game(props) {

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const updateScore = (newScore1, newScore2) => {
    setScore1(score1 + newScore1);
    setScore2(score2 + newScore2);
  }

  return (
    <div className="game">
        <Board updateScore={updateScore} />
        <div className="score">
          <div className="score__player">

            <img className="score__logo" src={chromeLogo}></img>
            <h2 className="score__name">{`Player 1: ${score1}`}</h2>
          </div>
          <div className="score__player">
            <img className="score__logo" src={ieLogo}></img>
            <h2 className="score__name">{`Player 2: ${score2}`}</h2>
          </div>
        </div>
      </div>
  );
}

export default Game;