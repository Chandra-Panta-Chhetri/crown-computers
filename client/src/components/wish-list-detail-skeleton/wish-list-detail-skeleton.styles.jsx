import styled from "styled-components";
import Skeleton from "../skeleton/skeleton.component";

export const BackToWishListsSkeleton = styled(Skeleton)`
  height: 60px;
  width: 35%;

  @media only screen and (max-width: 700px) {
    height: 40px;
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const WishListNameSkeleton = styled(Skeleton)`
  height: 60px;
  width: 35%;

  @media only screen and (max-width: 700px) {
    height: 40px;
    width: 100%;
  }
`;

export const AddAllToCartSkeleton = styled(Skeleton)`
  height: 60px;
  width: 35%;
  margin: 20px 0 0 0;

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;
