import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import { GameContainer } from './styles';
import Score from '../Score/Score';

function Game({ sameScreen }) {

  const [score, setScore] = useState([0,0]);
  const [gameState, setGameState] = useState('p2Turn'); // gameState is either p1Turn, p2Turn, p1Won, p2Won
  
  const [playerView, setPlayerView] = useState(-1); // which player's view should screen display if they're playing on different screens?
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');

  const playerNames = { p1Name, p2Name, setP1Name, setP2Name };

  // const gameStateMsg = {
  //   'p1Turn': "It's player 1's turn",
  //   'p2Turn': "It's player 2's turn",
  //   'p1Won': "Player 1 won!",
  //   'p2Won': "Player 2 won!"
  // };

  const gameStateMsg = (gameStateCode) => {
    if (gameStateCode === 'p1Turn')
      return `It's ${p1Name}'s turn`; 
    if (gameStateCode === 'p2Turn')
      return `It's ${p2Name}'s turn`;
    if (gameStateCode === 'p1Won')
      return `${p1Name} won!`; 
    if (gameStateCode === 'p2Won')
      return `${p2Name} won!`; 
  }

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
            playerView={playerView}
            playerNames={playerNames}>
          </Score>
          <p>{gameStateMsg(gameState)}</p>
        </div>
      </GameContainer>
  );
}

export default Game;