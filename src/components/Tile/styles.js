import styled from "styled-components";

export const TileContainer = styled.div`

  height: 12.5%;
  width: 12.5%;
  border: 8px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${p => p.color ? 'white' : 'black'};
  border: 8px solid ${p => p.color ? 'white' : 'black'};

  ${(props) => !props.color ? 
    `&:hover {
      border: 8px solid #ffa8b770;
    }` : ''}

${(props) => props.isFocusTile ? 
    `border: 8px solid #ffa8b7;
      &:hover {
        border: 8px solid #ffa8b7;
      }
    ` : ''}

  .label {
    position: absolute;
    font-size: 16px;
    top: -22px;
    right: 0;
  }

  .crown {
    filter: invert(69%) sepia(88%) saturate(536%) hue-rotate(2deg) brightness(108%) contrast(98%);
    height: 30px;
    position: absolute;
    z-index: 1;
    top: -1px;
    left: -1px;
    transform: rotate(-29deg);
  }
`;

export const CheckerPiece = styled.img`
  src: ${props => props.src};
  height: 80%;
  position: relative;

  ${(props) => props.isFocusTile ? 
    `border: 8px solid #ffa8b7;
      &:hover {
        border: 8px solid #ffa8b7;
      }
    ` : ''}
`;