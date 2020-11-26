import styled, { css } from "styled-components";

const NavMenuOptionStyles = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.secondary};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 20px;
    text-transform: capitalize;

    &:hover {
      background-color: ${(props) => props.theme.secondary};
      color: white;
    }

    i {
      margin-right: 14px;
    }
  }

  .active-nav-menu-option {
    color: white;
  }
`;

export const SideNavContainer = styled.section`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 50px;
  z-index: 100;
`;

export const Navbar = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 50px 25px;
  align-items: center;
`;

export const NavbarBrand = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.7rem;
`;

export const AdminName = styled.span`
  color: #3498db;
  letter-spacing: 2.5px;
  font-weight: bold;
  text-transform: capitalize;
  margin-left: 1rem;

  i {
    margin-left: 7px;
  }

  @media only screen and (max-width: 650px) {
    i {
      display: none;
    }
  }
`;

export const SideNavTitle = styled.span`
  margin-right: 16px;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: bold;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

export const NavMenu = styled.nav`
  background-color: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isMenuShown ? "0" : "-100%")};
  transition: all 350ms;
  z-index: 100;
`;

export const NavMenuItems = styled.ul`
  width: 90%;
  padding-left: 0;
  display: flex;
  flex-direction: column;
`;

export const NavMenuClose = styled.li`
  background-color: #060b26;
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 1rem;
    font-size: 2rem;
    background: none;
    color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
`;

export const MenuBars = styled.span`
  margin-left: 1rem;
  font-size: 2rem;
  background: none;
  color: ${(props) => props.theme.secondary};
  cursor: pointer;

  @media only screen and (max-width: 650px) {
    margin-left: 0;
  }
`;

export const NavMenuOption = styled.li`
  ${NavMenuOptionStyles}
`;

export const LogOutOption = styled.li`
  ${NavMenuOptionStyles}
  margin-top: auto
`;
