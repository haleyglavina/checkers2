import React, { useEffect, useState } from 'react';
import './Game.scss';
import Board from '../Board/Board';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';
import { GameContainer, Score } from './styles';

function Game(props) {

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  // change score to 1 state of [#, #]
  const [gameState, setGameState] = useState('p1Turn'); // gameState is either p1Turn, p2Turn, p1Won, p2Won
  const [sameScreen, setSameScreen] = useState(false); // are players playing on same screen?
  const [playerView, setPlayerView] = useState(-1); // which player's view should screen display if they're playing on different screens?

  const gameStateMsg = {
    'p1Turn': "It's player 1's turn",
    'p2Turn': "It's player 2's turn",
    'p1Won': "Player 1 won!",
    'p2Won': "Player 2 won!"
  };

  const game = {gameState, setGameState};

  const updateScore = (newScore) => {
    setScore1(score1 + newScore[0]);
    setScore2(score2 + newScore[1]);
  }

  return (
    <GameContainer className="game">
        <Board 
          updateScore={updateScore} 
          game={game} 
          score={[score1, score2]}
          sameScreen={sameScreen}
          playerView={playerView}/>
        <Score>
          <div className="player">
            <img className="logo" src={chromeLogo} alt="Player 1 logo"></img>
            <div>
              <h2 className="name">{`Player 1: ${score1}`}</h2>
              {!sameScreen ? <h3 className="name-label">{`${playerView === 1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
            </div>
          </div>
          <div className="player">
            <img className="logo" src={ieLogo} alt="Player 2 logo"></img>
            <div>
              <h2 className="name">{`Player 2: ${score2}`}</h2>
              {!sameScreen ? <h3 className="name-label">{`${playerView === -1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
            </div>
          </div>
          <p>{gameStateMsg[gameState]}</p>
        </Score>
      </GameContainer>
  );
}

export default Game;