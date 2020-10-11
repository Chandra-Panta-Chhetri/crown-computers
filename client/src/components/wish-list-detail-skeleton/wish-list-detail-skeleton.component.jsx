import React from "react";
import {
  WishListDetailContainer,
  Header
} from "../wish-list-detail/wish-list-detail.styles";

import Skeleton from "../skeleton/skeleton.component";

const WishListDetailSkeleton = () => (
  <WishListDetailContainer>
    <Header>
      <Skeleton height="60px" width="35%" />
      <Skeleton height="60px" width="35%" />
    </Header>
    <Skeleton height="250px" />
    <Skeleton height="60px" width="35%" margin="20px 0 0 0" />
  </WishListDetailContainer>
);

export default WishListDetailSkeleton;
