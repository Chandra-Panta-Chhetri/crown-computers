import styled from "styled-components";

export const ThemeToggleContainer = styled.button`
  background-color: ${(props) =>
    props.darkMode
      ? "background-color: rgba(0, 0, 0, 0.171)"
      : "rgba(255, 255, 255, 0.192)"};
  border-radius: 30px;
  width: 58px;
  position: relative;
  height: 32px;
  flex-shrink: 0;
  margin-left: 16px;

  &::before {
    width: 32px;
    height: 100%;
    font-family: "Font Awesome 5 Free" !important;
    content: ${(props) => (props.darkMode ? '"\f186"' : '"\f185"')};
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.3s;
    transform: ${(props) => (props.darkMode ? "translateX(26px)" : "none")};
  }

  &::after {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 6px;
    top: 6px;
    background-color: #667eea;
    content: "";
    border-radius: 50%;
    transition: transform 0.3s;
    transform: ${(props) => (props.darkMode ? "translateX(-24px)" : "none")};
  }
`;
