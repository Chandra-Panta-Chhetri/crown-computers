import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const SideNavContainer = styled.section`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 50px;
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
`;

export const SideNavTitle = styled.span`
  margin-right: 16px;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: bold;
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
  transition: ${(props) => (props.isMenuShown ? "350ms" : "850ms")};
  z-index: 100;
`;

export const NavMenuItems = styled.ul`
  width: 100%;
  padding-left: 0;
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
    color: ${secondaryColor};
    cursor: pointer;
  }
`;

export const MenuBars = styled.span`
  margin-left: 1rem;
  font-size: 2rem;
  background: none;
  color: ${secondaryColor};
  cursor: pointer;
`;

export const NavMenuOption = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: ${secondaryColor};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 20px;
    text-transform: capitalize;

    &:hover {
      background-color: ${secondaryColor};
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
