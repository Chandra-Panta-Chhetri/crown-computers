import styled from "styled-components";

import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn.component";
import AddToWishListBtn from "../add-to-wish-list-btn/add-to-wish-list-btn.component";

export const ProductDetailContainer = styled.section`
  display: flex;
  padding: 0;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const ProductInfoContainer = styled.div`
  padding-bottom: 1rem;
  padding-left: 1.3rem;
  flex-grow: 1;
  width: 65%;

  @media only screen and (max-width: 800px) {
    width: 100%;
    margin-top: 20px;
    padding-left: 0;
  }
`;

export const ProductCategory = styled.h5`
  margin: 0;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  width: ${(props) => (props.isLoading ? "100%" : "fit-content")};
  height: ${(props) => (props.isLoading ? "20px" : "unset")};
  text-transform: uppercase;
  color: gray;

  &:hover {
    color: ${(props) => props.theme.secondary};
  }
`;

export const ProductStock = styled.p`
  margin: 10px 0 0;
  text-transform: capitalize;
  color: red;
  font-weight: bold;
  text-align: right;
`;

export const ProductName = styled.h1`
  margin: 0 0 10px;
  font-size: 1.875rem;
  text-transform: capitalize;
`;

export const AddToWishListIcon = styled(AddToWishListBtn)`
  float: right;
`;

export const ProductDescription = styled.p`
  margin: 0;
`;

export const ProductActionContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const AddProductToCart = styled(AddToCartBtn)`
  margin-left: auto;
  padding-right: 0.85rem;
  padding-left: 3.7rem;

  i {
    width: 25%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 1.7rem;

  @media only screen and (max-width: 400px) {
    width: 100%;
    text-align: left;
  }
`;
