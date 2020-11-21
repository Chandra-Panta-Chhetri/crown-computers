import React from "react";
import {
  PreviewContainer,
  WishListItemImage,
  WishListItemName
} from "./wish-list-item-preview.styles";

import { truncate } from "../../global.utils";

const WishListItemPreview = ({ item: { imageUrls, name, price } }) => (
  <PreviewContainer>
    <WishListItemImage src={imageUrls[0]} alt={name} />
    <div>
      <WishListItemName>
        {truncate(name, 20)} (${price})
      </WishListItemName>
    </div>
  </PreviewContainer>
);

export default WishListItemPreview;
