import React, { useEffect, useState } from 'react';
import './Game.scss';
import Board from '../Board/Board';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';
import { GameContainer } from './styles';
import Score from '../Score/Score';

function Game({ sameScreen }) {

  const [score, setScore] = useState([0,0]);
  const [gameState, setGameState] = useState('p1Turn'); // gameState is either p1Turn, p2Turn, p1Won, p2Won
  
  const [playerView, setPlayerView] = useState(-1); // which player's view should screen display if they're playing on different screens?

  const gameStateMsg = {
    'p1Turn': "It's player 1's turn",
    'p2Turn': "It's player 2's turn",
    'p1Won': "Player 1 won!",
    'p2Won': "Player 2 won!"
  };

  const game = {gameState, setGameState};

  const updateScore = (newScore) => {
    setScore([score[0] + newScore[0], score[1] + newScore[1]]);
  }

  return (
    <GameContainer className="game">
        <Board 
          updateScore={updateScore} 
          game={game} 
          score={score}
          sameScreen={sameScreen}
          playerView={playerView}/>
        <div>
          <Score 
            score={score}
            sameScreen={sameScreen}
            playerView={playerView}>
          </Score>
          <p>{gameStateMsg[gameState]}</p>
        </div>
      </GameContainer>
  );
}

export default Game;