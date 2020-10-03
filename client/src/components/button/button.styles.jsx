import styled, { css } from "styled-components";

const buttonStyles = css`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid ${(props) => props.color};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: ${(props) => props.color};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;

  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }

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
    background: ${(props) => props.color};
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
`;

export const ButtonContainer = styled.button`
  ${buttonStyles}
`;

export const ButtonWithIconContainer = styled.button`
  ${buttonStyles}
  display: flex;
  align-items: center;
  padding-right: 2.2rem;
  justify-content: flex-end;

  i {
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
