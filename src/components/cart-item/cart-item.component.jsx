import React from "react";
import "./cart-item.styles.scss";

export const CartItem = ({ item }) => (
  <div className="cart-item">
    <div className="cart-item-details">
      <p className="item-name">{item.name}</p>
      <p className="item-quantity">
        <span>{item.quantity}</span> x ${item.price}
      </p>
    </div>
    <img className="cart-item-img" src={item.imageUrl} alt={item.name} />
  </div>
);
