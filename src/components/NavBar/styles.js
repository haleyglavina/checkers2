import styled from "styled-components";

export const Nav = styled.nav`
  background-image: linear-gradient(180deg, rgba(170,170,170,0.4), rgba(0,0,0,0));
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;

  .title {
    margin: 0;
  }

  .toggle {
  height: 1.5rem;
  width: 2.7rem;
  border-radius:  1.5rem;
  border: 2px solid white;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: inset 2px 1px 10px darkgrey;

  &:hover {
    cursor: pointer;
  }

  &--on {
    background-color: $bg-dark;
    box-shadow: inset 2px 1px 10px black;
  }

  &__symbol {
    position: absolute;
    font-size: 1rem;

    &--dark {
      left: 3px;
    }

    &--light {
      right: 3px;
    }
  }

  &__dial {
    background-color:  white;
    box-shadow: 2px 1px 10px darkgrey;
    height: 1.3rem;
    width: 1.3rem;
    border-radius:  1rem;
    margin: 0 0.1rem;
    position: absolute;
    left: 0;
    transition: all 0.3s ease-in-out;

    &--on {
      left: 24px;
      box-shadow: inset 2px 1px 10px darkgrey;
    }
  }
}
`;