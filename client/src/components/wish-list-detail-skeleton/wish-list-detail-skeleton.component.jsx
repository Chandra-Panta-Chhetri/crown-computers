import React from "react";
import {
  WishListDetailContainer,
  Header
} from "../wish-list-detail/wish-list-detail.styles";
import {
  BackToWishListsSkeleton,
  WishListNameSkeleton,
  AddAllToCartSkeleton
} from "./wish-list-detail-skeleton.styles";

import Skeleton from "../skeleton/skeleton.component";

const WishListDetailSkeleton = () => (
  <WishListDetailContainer>
    <Header>
      <BackToWishListsSkeleton />
      <WishListNameSkeleton />
    </Header>
    <Skeleton height="250px" />
    <AddAllToCartSkeleton />
  </WishListDetailContainer>
);

export default WishListDetailSkeleton;
