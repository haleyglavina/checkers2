import React from 'react';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';
import { ScoreContainer } from './styles';

function Score({score, sameScreen, playerView}) {
  return (
    <ScoreContainer>
      <div className="player">
        <img className="logo" src={ieLogo} alt="Player 1 logo"></img>
        <div>
          <h2 className="name">{`Player 1: ${score[0]}`}</h2>
          {!sameScreen ? <h3 className="name-label">{`${playerView === -1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
        </div>
      </div>
      <div className="player">
        <img className="logo" src={chromeLogo} alt="Player 2 logo"></img>
        <div>
          <h2 className="name">{`Player 2: ${score[1]}`}</h2>
          {!sameScreen ? <h3 className="name-label">{`${playerView === 1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
        </div>
      </div>
    </ScoreContainer>
  );
}

export default Score;