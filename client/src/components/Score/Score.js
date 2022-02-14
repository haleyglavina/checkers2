import React, { useRef } from 'react';
import ieLogo from '../../assets/ieLogo.png';
import chromeLogo from '../../assets/chromeLogo.png';
import { ScoreContainer } from './styles';
import ContentEditable from 'react-contenteditable'

function Score({score, sameScreen, playerView, playerNames}) {

  // References needed so the changes to content editable elements can be detected by React
  // Content editable used to update the players' names, players' names are hooks in Game component
  console.log("p1 name:", playerView.p1Name);
  const p1Text = useRef(playerView.p1Name || 'Player 1');
  const p2Text = useRef(playerView.p2Name || 'Player 2');

  const p1NameBlur = (e) => {
    playerNames.setP1Name(p1Text.current);
  }

  const p1NameChange= (e) => {
    p1Text.current = e.target.value;
  }

  const p2NameBlur = (e) => {
    playerNames.setP2Name(p2Text.current);
  }

  const p2NameChange = (e) => {
    p2Text.current = e.target.value;
  }


  return (
    <ScoreContainer>
      <div className="player">
        <img className="logo" src={ieLogo} alt="Player 1 logo"></img>
        <div>
          <div className="name-score">
            <ContentEditable 
              html={p1Text.current}
              onBlur={p1NameBlur}
              onChange={p1NameChange}
              className="name"
              disabled={sameScreen ? false: playerView === -1 ? false : true}
            />
            <h2 className="score">{`: ${score[0]}`}</h2>
          </div>
          {!sameScreen ? <h3 className="name-label">{`${playerView === -1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
        </div>
      </div>
      <div className="player">
        <img className="logo" src={chromeLogo} alt="Player 2 logo"></img>
        <div>
          <div className="name-score">
            <ContentEditable 
              html={p2Text.current}
              onBlur={p2NameBlur}
              onChange={p2NameChange}
              className="name"
              disabled={sameScreen ? false: playerView === 1 ? false : true}
            />
            {/* <span contentEditable={sameScreen ? true : playerView === 1 ? true : false} className="name" onBlur={p2NameBlur}>{playerNames.p2Name}</span> */}
            <h2 className="score">{`: ${score[1]}`}</h2>
          </div>
          {!sameScreen ? <h3 className="name-label">{`${playerView === 1 ? '(You)' : '(Opponent)'}`}</h3> : ''}
        </div>
      </div>
    </ScoreContainer>
  );
}

export default Score;