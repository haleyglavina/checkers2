import React, { useState } from 'react';


function Toggle({ toggleAction, initialState }) {

  const [toggleOn, setToggleOn] = useState(initialState);
  
  const toggleClicked = () => {
    setToggleOn(!toggleOn);
    toggleAction();
  }

  return (
    <div className={`toggle ${toggleOn ? 'toggle--on' : ''}`} onClick={toggleClicked}>
      <p className="toggle__symbol toggle__symbol--dark">🌜</p>
      <p className="toggle__symbol toggle__symbol--light">🌞</p>
      <div className={`toggle__dial ${toggleOn ? 'toggle__dial--on' : ''}`}></div>
    </div>
  );
}

export default Toggle;