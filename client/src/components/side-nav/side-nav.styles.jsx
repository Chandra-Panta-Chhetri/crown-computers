import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const SideNavContainer = styled.section`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 50px;

  .admin-name {
    letter-spacing: 2.5px;
    font-weight: bold;
    text-transform: capitalize;

    span {
      width: 110px;
      overflow-x: hidden;
    }

    i {
      margin-left: 7px;
    }
  }

  .navbar {
    background-color: #060b26;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 50px 25px;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      margin-right: 1rem;

      span {
        margin-right: 16px;
        color: #3498db;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: bold;
      }
    }
  }

  .menu-bars {
    margin-left: 1rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 100;

    &.active {
      left: 0;
      transition: 350ms;
    }

    .active-nav-option {
      color: white;
    }
  }

  .nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    height: 60px;

    a {
      text-decoration: none;
      color: ${secondaryColor};
      font-size: 18px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;

      &:hover {
        background-color: ${secondaryColor};
        color: white;
      }
    }
  }

  .nav-menu-items {
    width: 100%;
    padding-left: 0;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
`;
