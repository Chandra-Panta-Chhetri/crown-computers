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
  product: { imageUrl, name, price, productId },
  history
}) => (
  <ProductCarouselItemContainer>
    <ItemImageContainer>
      <ItemImage src={imageUrl} alt={name} />
    </ItemImageContainer>
    <ItemName onClick={() => history.push(`/shop/${productId}`)}>
      {name}
    </ItemName>
    <ItemPrice>${price}</ItemPrice>
  </ProductCarouselItemContainer>
);

export default withRouter(ProductCarouselItem);
