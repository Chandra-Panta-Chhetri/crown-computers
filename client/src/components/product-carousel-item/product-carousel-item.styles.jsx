import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const ProductCarouselItemContainer = styled.section`
  padding: 10px;
  text-align: center;
`;

export const ItemImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 179px;
  height: 179px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
  display: block;
`;

export const ItemName = styled.h5`
  width: 100%;
  font-size: 14.5px;
  margin: 5px 0 8px;
  cursor: pointer;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const ItemPrice = styled.h4`
  width: 100%;
  color: gray;
  margin: 0;
`;
