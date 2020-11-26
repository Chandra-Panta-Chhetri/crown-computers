import styled from "styled-components";

export const CartItemContainer = styled.li`
  margin-bottom: 18px;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const ItemImage = styled.img`
  float: left;
  margin-right: 12px;
  width: 70px;
  height: 70px;
`;

export const ItemName = styled.span`
  display: block;
  padding-top: 10px;
  font-size: 16px;
  font-weight: 700;
`;

export const ItemPrice = styled.span`
  color: ${(props) => props.theme.secondary};
  margin-right: 8px;
  font-weight: 700;
`;

export const ItemQuantity = styled.span`
  float: right;
  color: ${(props) => props.theme.primaryLight};
`;

export const ItemInfo = styled.div`
  width: 100%;
`;
