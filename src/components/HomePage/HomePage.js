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
  justify-content: center;
  font-size: calc(10px + 2vmin);

  ${(props) => {
    if (props.theme == 'light') {
      return `
        background-color: #eeeeee;
        color: black;
      `
    } else {
      return `
        background-color: #282c34;
        color: white;
      `
    }
  }}
`;

function HomePage(props) {

  const [theme, setTheme] = useState("light");
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