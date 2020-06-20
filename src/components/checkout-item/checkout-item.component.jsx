import React from "react";
import "./checkout-item.styles.scss";

export const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <div className="checkout-item">
      <div className="product-image">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <i className="fa fa-minus"></i>
        {quantity}
        <i className="fa fa-plus"></i>
      </span>
      <span className="price">${price} ea.</span>
      <span className="remove">&#10005;</span>
    </div>
  );
};
