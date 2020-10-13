import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { mainColorLight, secondaryColor } from "../../global.styles";

const navItemsHoverStyles = css`
  &:hover {
    color: ${secondaryColor};
  }
`;

const navItemStyles = css`
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  color: ${mainColorLight};
`;

export const NavBarContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavBarItems = styled.div`
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
  ${navItemStyles}
  ${navItemsHoverStyles}
`;

export const Username = styled.div`
  ${navItemStyles}
  cursor: default;
  font-weight: 700;
  text-transform: capitalize;

  span {
    width: 110px;
    overflow-x: hidden;
  }

  i {
    margin-left: 5px;
  }
`;

export const LogOutBtn = styled(Link)`
  ${navItemStyles}
  ${navItemsHoverStyles}
`;
