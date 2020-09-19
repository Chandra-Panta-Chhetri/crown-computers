import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const ProductCarouselItemContainer = styled.div`
  padding: 10px;
  text-align: center;
`;

export const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.isLoading ? "200px" : "unset")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemName = styled.h5`
  width: 100%;
  height: ${(props) => (props.isLoading ? "40px" : "unset")};
  font-size: 14.5px;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  margin: 5px 0 8px;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const ItemPrice = styled.h4`
  width: 100%;
  height: ${(props) => (props.isLoading ? "15px" : "unset")};
  color: gray;
  margin: 0;
`;

export const ItemImage = styled.img`
  width: 179px;
  height: 179px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
  display: block;
`;
