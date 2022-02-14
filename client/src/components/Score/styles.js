import styled from "styled-components";

export const ScoreContainer = styled.div`
  .player {
    display: flex;
    margin-bottom: 50px;
  }

  .logo {
    max-height: 75px;
  }

  .name {
    margin: 0;
    font-size: 1.5em;
    background-color: inherit;
    border: none;
    color: inherit;
    font-weight: bold;
    height: min-content;
  }

  .name-score {
    display: flex;
    align-items: center;
  }

  .name-label {
    font-size: 1rem;
    margin-top: 0;
  }

  .score {
    margin: 0;
  }
`;