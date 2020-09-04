import styled from "styled-components";

export const CartSummaryItemContainer = styled.article`
  display: flex;
  margin-bottom: 20px;
  padding: 20px 15px 15px;
  border: 2px solid #efefef;
`;

export const EditItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
`;

export const ImageContainer = styled.div`
  width: 70%;
`;

export const ItemImage = styled.img`
  width: 100%;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;
  justify-content: flex-start;
  letter-spacing: 1.1px;
`;

export const ItemQuantityActions = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
  font-size: 17px;
  font-weight: 700;
`;

export const ItemCategory = styled.span`
  width: fit-content;
  color: gray;
  margin: 6px 0;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
`;

export const ChangeQuantityButton = styled.i`
  cursor: pointer;
  margin: 0 5px;
`;

export const RemoveItemButton = styled.span`
  cursor: pointer;
  color: red;
  width: fit-content;
  font-weight: 700;
`;

export const ItemPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0 6px;
`;

export const ItemStockLeft = styled.span`
  color: red;
  font-weight: 700;
  margin: 8px 0;
`;
