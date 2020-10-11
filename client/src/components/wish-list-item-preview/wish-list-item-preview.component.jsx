import React from "react";
import {
  PreviewContainer,
  WishListItemImage,
  WishListItemName,
  WishListItemPrice
} from "./wish-list-item-preview.styles";

import { truncate } from "../../global.utils";

const WishListItemPreview = ({ item: { imageUrls, name, price } }) => (
  <PreviewContainer>
    <WishListItemImage src={imageUrls[0]} alt={name} />
    <WishListItemName>{truncate(name, 20)}</WishListItemName>
    <WishListItemPrice>${price} ea.</WishListItemPrice>
  </PreviewContainer>
);

export default WishListItemPreview;
