import styled from "styled-components";
import Button from "../button/button.component";

export const CartDropDownContainer = styled.article`
  border: 1px solid black;
  padding: 20px 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 260px;
  height: 340px;
  top: 85px;
  right: 55px;
  background-color: white;
  border-radius: 25px;
`;

export const ViewCartButton = styled(Button)`
  color: white;
  background-color: black;

  &:hover {
    color: black;
    background-color: #efefef;
  }
`;
