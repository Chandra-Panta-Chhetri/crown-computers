import React from "react";
import {
  WishlistDetailContainer,
  Header
} from "../wishlist-detail/wishlist-detail.styles";

import Skeleton from "../skeleton/skeleton.component";

const WishlistDetailSkeleton = () => (
  <WishlistDetailContainer>
    <Header>
      <Skeleton height="60px" width="35%" />
      <Skeleton height="60px" width="35%" />
    </Header>
    <Skeleton height="250px" />
    <Skeleton height="60px" width="35%" margin="20px 0 0 0" />
  </WishlistDetailContainer>
);

export default WishlistDetailSkeleton;
