import React from "react";
import { CartItemContainer, ItemImage } from "./cart-item.styles";

const CartItem = ({ item }) => (
  <CartItemContainer>
    <div>
      <p>{item.name}</p>
      <p>
        <span>{item.quantity}</span> x ${item.price}
      </p>
    </div>
    <ItemImage src={item.imageUrl} alt={item.name} />
  </CartItemContainer>
);

export default CartItem;
