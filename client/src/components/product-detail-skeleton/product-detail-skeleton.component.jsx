import React from "react";
import { ProductActionContainerSkeleton } from "./product-detail-skeleton.styles";
import {
  ProductDetailContainer,
  ProductInfoContainer
} from "../product-detail/product-detail.styles";

import Skeleton from "../skeleton/skeleton.component";

const ProductDetailSkeleton = () => (
  <>
    <ProductDetailContainer>
      <Skeleton width="400px" height="400px" />
      <ProductInfoContainer>
        <Skeleton width="30%" height="20px" />
        <Skeleton height="25px" margin="10px 0" />
        <Skeleton height="15px" />
        <Skeleton height="150px" margin="25px 0" />
        <ProductActionContainerSkeleton>
          <Skeleton width="25%" height="40px" />
          <Skeleton width="30%" height="40px" margin="0 0 0 auto" />
        </ProductActionContainerSkeleton>
      </ProductInfoContainer>
    </ProductDetailContainer>
    <Skeleton width="30%" height="25px" margin="50px 0 20px" />
    <Skeleton height="250px" />
  </>
);

export default ProductDetailSkeleton;
