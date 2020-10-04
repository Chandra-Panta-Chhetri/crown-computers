import React from "react";
import {
  PreviewContainer,
  WishlistItemImage,
  WishlistItemName,
  WishlistItemPrice
} from "./wishlist-item-preview.styles";

import { truncate } from "../../redux/cart/cart.sagas";

const WishlistItemPreview = ({ imageUrl, name, price }) => (
  <PreviewContainer>
    <WishlistItemImage src={imageUrl} alt={name} />
    <WishlistItemName>{truncate(name, 20)}</WishlistItemName>
    <WishlistItemPrice>${price} ea.</WishlistItemPrice>
  </PreviewContainer>
);

export default WishlistItemPreview;
