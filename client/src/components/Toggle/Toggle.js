import React, { useState } from 'react';


function Toggle({ toggleAction, initialState, symbols }) {

  const [toggleOn, setToggleOn] = useState(initialState);
  
  const toggleClicked = () => {
    setToggleOn(!toggleOn);
    toggleAction();
  }

  return (
    <div className={`toggle ${toggleOn ? 'toggle--on' : ''}`} onClick={toggleClicked}>
      {symbols ? <p className="toggle__symbol toggle__symbol--dark">{symbols[0]}</p> : ''}
      {symbols ? <p className="toggle__symbol toggle__symbol--light">{symbols[1]}</p> : ''}
      <div className={`toggle__dial ${toggleOn ? 'toggle__dial--on' : ''}`}></div>
    </div>
  );
}

Toggle.defaultProps = {
  toggleAction: () => {},
  initialState: false,
  symbols: null
};

export default Toggle;