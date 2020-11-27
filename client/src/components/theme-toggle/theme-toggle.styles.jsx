import styled from "styled-components";

export const ThemeToggleContainer = styled.button`
  background-color: ${(props) =>
    props.darkMode ? "rgba(0, 0, 0, 0.171)" : "rgba(255, 255, 255, 0.192)"};
  border-radius: 25px;
  width: 60px;
  position: relative;
  height: 28px;
  margin-left: 10px;
  outline: none;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.darkMode ? "white" : props.theme.secondary)};

  &::before {
    width: 25px;
    height: 100%;
    font-family: "Font Awesome 5 Free";
    content: ${(props) => (props.darkMode ? '"\f186"' : '"\f185"')};
    left: 0;
    position: absolute;
    top: 0;
    transition: all 0.5s;
    transform: ${(props) => (props.darkMode ? "translateX(28px)" : "none")};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.darkMode ? "white" : "black")};
  }

  &::after {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 4px;
    top: 2px;
    background-color: ${(props) =>
      props.darkMode ? "white" : props.theme.secondary};
    content: "";
    border-radius: 25px;
    transition: transform 0.5s;
    transform: ${(props) => (props.darkMode ? "translateX(-27px)" : "none")};
  }
`;
