import styled from "styled-components";
import { secondaryColor } from "../../global.styles";
import { AddToCartBtnContainer } from "../add-to-cart-btn/add-to-cart-btn.styles";

export const ProductDetailContainer = styled.section`
  display: flex;
  padding: 0;
`;

export const ProductStock = styled.p`
  margin: 10px 0 0;
  text-transform: capitalize;
  color: red;
  font-weight: bold;
  text-align: right;
`;

export const ProductDescription = styled.p`
  margin: 0;
`;

export const ProductInfoContainer = styled.div`
  padding-bottom: 1rem;
  padding-left: 1.3rem;
  flex-grow: 1;
  width: 65%;
`;

export const ProductCategory = styled.h5`
  margin: 0;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  width: ${(props) => (props.isLoading ? "100%" : "fit-content")};
  height: ${(props) => (props.isLoading ? "20px" : "unset")};
  text-transform: uppercase;
  color: gray;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const ProductName = styled.h1`
  margin: 0 0 10px;
  font-size: 1.875rem;
`;

export const ProductActionContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;

  ${AddToCartBtnContainer} {
    margin-left: auto;
  }
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 1.7rem;
`;
