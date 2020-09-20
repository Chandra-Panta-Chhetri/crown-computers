import React from "react";
import {
  CartItemContainer,
  ItemImage,
  ItemName,
  ItemPrice,
  ItemQuantity,
  ItemInfo
} from "./cart-item.styles";

import { truncate } from "../../redux/cart/cart.sagas";

const CartItem = ({ item }) => (
  <CartItemContainer>
    <ItemImage src={item.imageUrls[0]} alt={item.name} />
    <ItemInfo>
      <ItemName>{truncate(item.name)}</ItemName>
      <ItemPrice>${item.price}</ItemPrice>
      <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
    </ItemInfo>
  </CartItemContainer>
);

export default React.memo(CartItem);
