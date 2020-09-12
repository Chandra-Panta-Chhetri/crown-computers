import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const CartIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const Badge = styled.span`
  font-weight: bold;
  background-color: ${secondaryColor};
  border-radius: 10px;
  color: white;
  font-size: 13px;
  line-height: 1;
  padding: 4px 9px;
  text-align: center;
  white-space: nowrap;
`;

export const ShoppingCartIcon = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;
