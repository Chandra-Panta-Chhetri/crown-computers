import styled from "styled-components";
import Skeleton from "../skeleton/skeleton.component";

export const ProductActionContainerSkeleton = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ProductPriceSkeleton = styled(Skeleton)`
  width: 25%;
  height: 40px;

  @media only screen and (max-width: 400px) {
    width: 55%;
  }
`;

export const AddToCartBtnSkeleton = styled(Skeleton)`
  width: 30%;
  height: 40px;
  margin: 0 0 0 auto;

  @media only screen and (max-width: 400px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const ProductImagesSkeleton = styled(Skeleton)`
  width: 35%;
  height: 350px;

  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

export const ProductsCarouselSkeleton = styled(Skeleton)`
  width: 30%;
  height: 25px;
  margin: 50px 0 20px;

  @media only screen and (max-width: 750px) {
    margin: 20px 0 20px;
    width: 45%;
  }
`;
