import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import Game from '../Game/Game';
import NavBar from '../NavBar/NavBar';
import ThemeContext from '../../utils/ThemeContext';
import styled from 'styled-components';

const MainContent = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  transition: all 0.3s ease-in-out;

  background-color: ${(props) => props.theme === 'light' ? '#eeeeee' : '#282c34'};
  color: ${(props) => props.theme === 'light' ? 'black' : 'white'};

 
`;

function HomePage(props) {

  const [theme, setTheme] = useState("dark");
  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MainContent theme={theme}>
        <NavBar />
        <h1>Checkers</h1>
        <Game />
      </MainContent>
    </ThemeContext.Provider>
  );
}

export default HomePage;