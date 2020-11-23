import styled from "styled-components";

export const ProductImageCarouselContainer = styled.div`
  width: 35%;

  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

export const ProductImageContainer = styled.div`
  display: flex !important;
  justify-content: center;
  outline: none;
`;

export const ProductImage = styled.img`
  width: 100%;
`;

export const NumOfPreviews = styled.p`
  text-align: center;
`;
