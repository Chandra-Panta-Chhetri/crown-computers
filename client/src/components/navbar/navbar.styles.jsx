import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { mainColorLight, secondaryColor } from "../../global.styles";

export const NavBarContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NavBarItems = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase;

  .active {
    color: ${secondaryColor};
    border-bottom: 3px solid;
    transition: border-bottom 350ms ease-out;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  color: ${mainColorLight};

  &:hover {
    color: ${secondaryColor};
  }
`;
