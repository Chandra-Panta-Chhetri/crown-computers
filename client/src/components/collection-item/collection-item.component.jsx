import React from "react";
import {
  CollectionItemContainer,
  ItemImageContainer,
  ItemImage,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice,
  ItemStock,
  ItemName
} from "./collection-item.styles";

import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";

import { withRouter } from "react-router-dom";

const CollectionItem = ({ item, history, intersectionCb }) => {
  const { name, imageUrls, price, category, stock, productId } = item;
  return (
    <CollectionItemContainer ref={intersectionCb}>
      <ItemImageContainer>
        <ItemImage src={imageUrls[0]} alt={name} />
        <ItemStock>In Stock: {stock}</ItemStock>
        <AddToCartButton itemToAddOnClick={item} />
      </ItemImageContainer>
      <ItemInfoContainer>
        <ItemCategory
          onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
        >
          {category}
        </ItemCategory>
        <ItemName onClick={() => history.push(`/shop/${productId}`)}>
          {name}
        </ItemName>
        <ItemPrice>${price}</ItemPrice>
      </ItemInfoContainer>
    </CollectionItemContainer>
  );
};

export default withRouter(CollectionItem);
