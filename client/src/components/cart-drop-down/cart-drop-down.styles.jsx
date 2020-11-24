import styled from "styled-components";
import { mainColor, secondaryColor } from "../../global.styles";

export const CartDropDownContainer = styled.article`
  background: ${mainColor};
  width: 320px;
  position: absolute;
  border-radius: 3px;
  padding: 20px;
  top: 85px;
  right: 55px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:after {
    bottom: 100%;
    left: 86%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: ${mainColor};
    border-width: 8px;
    margin-left: -8px;
  }
`;

export const CartDropDownHeader = styled.div`
  border-bottom: 1.8px solid ${secondaryColor};
  padding-bottom: 5px;
`;

export const CartTotal = styled.div`
  float: right;
  color: ${secondaryColor};
  font-weight: 700;
`;

export const LighterText = styled.span`
  margin-right: 3px;
`;
