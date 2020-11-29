import styled from "styled-components";

export const ThemeToggleContainer = styled.button`
  background-color: transparent;
  border-radius: 25px;
  width: 60px;
  position: relative;
  height: 28px;
  margin-left: 10px;
  outline: none;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.dashboardTextColor};

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
    color: ${(props) => props.theme.dashboardTextColor};
  }

  &::after {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 4px;
    top: 2px;
    background-color: ${(props) => props.theme.dashboardTextColor};
    content: "";
    border-radius: 25px;
    transition: transform 0.5s;
    transform: ${(props) => (props.darkMode ? "translateX(-27px)" : "none")};
  }

  @media only screen and (max-width: 400px) {
    margin-left: 0;
  }
`;
