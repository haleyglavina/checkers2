import styled from "styled-components";

export const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${p => p.playerView === -1 ? `
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
  ` : ''}
  color: white;
  width: ${p => p.boardSize * 88}px;
  height: ${p => p.boardSize * 88}px;
`;