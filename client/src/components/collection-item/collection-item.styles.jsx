import styled from "styled-components";
import { secondaryColor } from "../../global.styles";
import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn.component";

export const CollectionItemContainer = styled.div`
  font-weight: bold;
  width: 25%;
  padding: 0.5em;

  @media only screen and (max-width: 700px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
  display: block;
`;

export const ItemStock = styled.h4`
  width: 100%;
  top: 15px;
  margin: 0;
  text-align: center;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
`;

export const AddItemToCartBtn = styled(AddToCartBtn)`
  bottom: 15px;
  width: 90%;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
`;

export const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    ${ItemImage} {
      opacity: 0.2;
    }

    ${AddItemToCartBtn},
    ${ItemStock} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ItemInfoContainer = styled.div`
  h4,
  h5 {
    margin: 8px 0;
  }
`;

export const ItemCategory = styled.h5`
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  width: fit-content;
  text-transform: uppercase;
  color: gray;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const ItemName = styled.h5`
  width: ${(props) => (props.isLoading ? "100%" : "fit-content")};
  font-size: 14.5px;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  text-transform: capitalize;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const ItemPrice = styled.h4`
  width: 100%;
  color: gray;
`;
