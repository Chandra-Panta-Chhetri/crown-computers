import styled from "styled-components";

export const CartSummaryItemContainer = styled.article`
  display: flex;
  padding: 25px 40px;
  border: 4px solid #efefef;
  border-radius: 8px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ItemContent = styled.section`
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 15%;
  margin-right: 15px;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  font-size: 16px;
  justify-content: center;
`;

export const ItemQuantity = styled.span`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

export const ItemChangeQuantityIcon = styled.i`
  cursor: pointer;
  margin: 0 5px;
`;

export const ItemRemoveContainer = styled.span`
  cursor: pointer;
  color: red;
  align-self: flex-start;
`;

export const ItemPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
