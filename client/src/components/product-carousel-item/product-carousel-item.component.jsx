import React from "react";
import { ProductCarouselItemContainer } from "./product-carousel-item.styles";
import {
  ItemImage,
  ItemImageContainer,
  ItemName,
  ItemPrice
} from "./product-carousel-item.styles";

import { withRouter } from "react-router-dom";

const ProductCarouselItem = ({
  product: { imageUrls, name, price, productId },
  history
}) => (
  <ProductCarouselItemContainer>
    <ItemImageContainer>
      <ItemImage src={imageUrls[0]} alt={name} />
    </ItemImageContainer>
    <ItemName onClick={() => history.push(`/shop/${productId}`)}>
      {name}
    </ItemName>
    <ItemPrice>${price}</ItemPrice>
  </ProductCarouselItemContainer>
);

export default withRouter(ProductCarouselItem);
