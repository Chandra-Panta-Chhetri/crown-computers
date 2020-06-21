import React from "react";
import "./checkout-item.styles.scss";

import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeQuantity }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <div className="checkout-item">
      <div className="product-image">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <i
          className="fa fa-minus"
          onClick={() => changeQuantity(item, quantity - 1)}
        ></i>
        {quantity}
        <i
          className="fa fa-plus"
          onClick={() => changeQuantity(item, quantity + 1)}
        ></i>
      </span>
      <span className="price">${price} ea.</span>
      <span className="remove" onClick={() => removeItem(item)}>
        &#10005;
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeQuantity: (item, newQuantity) =>
    dispatch(changeQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
