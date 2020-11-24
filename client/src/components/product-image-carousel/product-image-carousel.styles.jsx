import styled from "styled-components";

export const ProductImageCarouselContainer = styled.div`
  width: 35%;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ProductImageContainer = styled.div`
  display: flex !important;
  justify-content: center;
  outline: none;
  height: 320px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const NumOfPreviews = styled.p`
  text-align: center;
`;
