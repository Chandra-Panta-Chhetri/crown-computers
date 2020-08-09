import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

export const NavItem = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
`;
