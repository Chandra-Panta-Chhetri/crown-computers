import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const ButtonContainer = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid ${secondaryColor};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: ${secondaryColor};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: ${secondaryColor};
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
`;
