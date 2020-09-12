import styled from "styled-components";

export const ItemInfoSection = styled.td`
  padding: 1.1em;
`;

export const ProductMetaInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const ProductInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

export const ProductName = styled.h5`
  margin: 0;
`;

export const ItemCategory = styled.span`
  width: fit-content;
  color: gray;
  margin: 4px 0 0;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
`;

export const ItemStockLeft = styled.span`
  color: red;
  font-weight: 700;
  margin: auto 0 0;
`;

export const ItemQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChangeQuantityButton = styled.i`
  cursor: pointer;
  margin: 0 5px;
  font-size: 20px;
`;

export const RemoveItemButton = styled.span`
  cursor: pointer;
  color: red;
  width: fit-content;
  font-weight: 700;
`;

export const Icon = styled.i`
  font-size: 22px;
`;
