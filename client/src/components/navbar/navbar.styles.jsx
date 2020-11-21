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

export const NavBarContainer = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled.i`
  font-size: 35px;
`;

export const ToggleIcon = styled.i`
  font-size: 30px;
  color: ${secondaryColor};
  float: right;
  line-height: 80px;
  margin-left: 15px;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: 750px) {
    display: initial;
  }
`;

export const NavMenuClose = styled.i`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  background: none;
  cursor: pointer;

  @media only screen and (max-width: 750px) {
    display: initial;
    top: 30px;
    right: 30px;
    color: ${secondaryColor};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 750px) {
    flex-direction: row-reverse;
  }
`;

export const NavBarItems = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase;
  position: relative;

  .active {
    color: ${secondaryColor};
    border-bottom: 3px solid;
    transition: border-bottom 350ms ease-out;
  }

  @media only screen and (max-width: 750px) {
    position: fixed;
    background: #2c3e50;
    top: 0;
    bottom: 0;
    width: 100%;
    right: ${(props) => (props.isCollapsed ? "0" : "-100%")};
    text-align: center;
    transition: all 0.5s;
    z-index: 100;
    flex-direction: column;
    justify-content: center;

    .active {
      border-bottom: none;
      color: white;
    }
  }
`;

export const NavItem = styled(NavLink)`
  ${navItemStyles}
  ${navItemsHoverStyles}

  @media only screen and (max-width: 750px) {
    display: initial;
    color: ${secondaryColor};

    &:hover {
      color: white;
    }
  }
`;

export const Username = styled.div`
  ${navItemStyles}
  cursor: default;
  font-weight: 700;
  text-transform: capitalize;

  i {
    margin-left: 5px;
  }

  @media only screen and (max-width: 500px) {
    white-space: normal;
    display: flex;
    align-items: center;
    justify-content: space-between;

    i {
      display: none;
    }
  }
`;

export const LogOutBtn = styled(Link)`
  ${navItemStyles}
  ${navItemsHoverStyles}

  @media only screen and (max-width: 750px) {
    color: ${secondaryColor};
  }
`;
