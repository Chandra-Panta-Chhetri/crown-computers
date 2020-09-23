import React from "react";
import {
  ProductImageSkelton,
  ProductCategorySkelton,
  ProductNameSkelton,
  TabSkelton,
  ProductDescriptionSkeleton,
  ProductActionContainerSkeleton,
  AddToCartBtnSkeleton,
  ProductPriceSkeleton,
  CarouselSkeleton,
  CarouselHeadingSkeleton
} from "./product-detail-skeleton.styles";

import {
  ProductDetailContainer,
  ProductInfoContainer
} from "../product-detail/product-detail.styles";

import Skeleton from "../skeleton/skeleton.component";

const ProductDetailSkeleton = () => (
  <>
    <ProductDetailContainer>
      <ProductImageSkelton>
        <Skeleton />
      </ProductImageSkelton>
      <ProductInfoContainer>
        <ProductCategorySkelton>
          <Skeleton />
        </ProductCategorySkelton>
        <ProductNameSkelton>
          <Skeleton />
        </ProductNameSkelton>
        <TabSkelton>
          <Skeleton />
        </TabSkelton>
        <ProductDescriptionSkeleton>
          <Skeleton />
        </ProductDescriptionSkeleton>
        <ProductActionContainerSkeleton>
          <ProductPriceSkeleton>
            <Skeleton />
          </ProductPriceSkeleton>
          <AddToCartBtnSkeleton>
            <Skeleton />
          </AddToCartBtnSkeleton>
        </ProductActionContainerSkeleton>
      </ProductInfoContainer>
    </ProductDetailContainer>
    <CarouselHeadingSkeleton>
      <Skeleton />
    </CarouselHeadingSkeleton>
    <CarouselSkeleton>
      <Skeleton />
    </CarouselSkeleton>
  </>
);

export default ProductDetailSkeleton;
