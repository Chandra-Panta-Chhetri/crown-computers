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
  font-family: "Open Sans", sans-serif;

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

const buttonHoverStyles = css`
  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }
`;

const buttonFocusStyles = css`
  &:focus {
    outline: 0;
    background: transparent;
  }
`;

const buttonDisabledStyles = css`
  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const DefaultButton = styled.button`
  ${buttonStyles}
  ${buttonHoverStyles}
  ${buttonFocusStyles}
  ${buttonDisabledStyles}
`;

export const ButtonWithIcon = styled.button`
  ${buttonStyles}
  ${buttonHoverStyles}
  ${buttonFocusStyles}
  ${buttonDisabledStyles}
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  i {
    font-size: 22px;
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

export const ButtonWithNoBorder = styled.button`
  ${buttonStyles}
  border: none;
  padding: 0 0 0 5px;
  ${buttonDisabledStyles}
  ${buttonFocusStyles}

  &:hover {
    i {
      transform: scale(1.4);
    }
  }

  i {
    width: auto !important;
  }
`;
