import styled, { css } from "styled-components";

import Button from "../button/button.component";

const secondaryStyles = css`
  color: gray;
`;

export const CollectionItemContainer = styled.section`
  font-weight: bold;
  width: 25%;
  padding: 0.5em;
`;

export const AddToCartButton = styled(Button)`
  bottom: 10px;
  left: 15px;
  width: 90%;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;

  i {
    margin-right: 5px;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
  display: block;
`;

export const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.isLoading ? "200px" : "unset")};

  &:hover {
    ${ItemImage} {
      opacity: 0.5;
    }

    ${AddToCartButton} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ItemInfoContainer = styled.div`
  h4,
  h5 {
    margin: 8px 0;
    letter-spacing: 2px;
  }
`;

export const ItemCategory = styled.h5`
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  width: ${(props) => (props.isLoading ? "100%" : "fit-content")};
  height: ${(props) => (props.isLoading ? "20px" : "unset")};

  &:hover {
    color: blue;
  }
  ${secondaryStyles}
`;

export const ItemName = styled.h5`
  width: 100%;
  height: ${(props) => (props.isLoading ? "40px" : "unset")};
`;

export const ItemPrice = styled.h4`
  width: 100%;
  height: ${(props) => (props.isLoading ? "15px" : "unset")};
  ${secondaryStyles}
`;

export const ItemStock = styled.h4`
  width: 100%;
  height: ${(props) => (props.isLoading ? "15px" : "unset")};
  ${secondaryStyles}
`;
