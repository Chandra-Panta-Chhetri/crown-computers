import React from "react";
import {
  AddToCartBtnSkeleton,
  ProductActionContainerSkeleton,
  ProductImagesSkeleton,
  ProductPriceSkeleton,
  ProductsCarouselSkeleton
} from "./product-detail-skeleton.styles";
import {
  ProductDetailContainer,
  ProductInfoContainer
} from "../product-detail/product-detail.styles";

import Skeleton from "../skeleton/skeleton.component";

const ProductDetailSkeleton = () => (
  <>
    <ProductDetailContainer>
      <ProductImagesSkeleton />
      <ProductInfoContainer>
        <Skeleton width="30%" height="20px" />
        <Skeleton height="25px" margin="10px 0" />
        <Skeleton height="15px" />
        <Skeleton height="150px" margin="25px 0" />
        <ProductActionContainerSkeleton>
          <ProductPriceSkeleton />
          <AddToCartBtnSkeleton />
        </ProductActionContainerSkeleton>
      </ProductInfoContainer>
    </ProductDetailContainer>
    <ProductsCarouselSkeleton />
    <Skeleton height="250px" />
  </>
);

export default ProductDetailSkeleton;
