import styled from "styled-components";

export const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;
  width: ${p => p.boardSize * 88}px;
  height: ${p => p.boardSize * 88}px;
`;