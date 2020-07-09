import React from "react";
import "./cart-summary-item.styles.scss";

import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeQuantity }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <article className="cart-summary-item">
      <section className="summary-meta">
        <div className="summary-img">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="summary-item-actions">
          <span className="summary-item-name">{name}</span>
          <span className="summary-item-quantity">
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
          <span
            className="summary-item-remove"
            onClick={() => removeItem(item)}
          >
            <i className="fas fa-trash"></i> Remove
          </span>
        </div>
      </section>
      <span className="summary-item-price">${price * quantity}</span>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeQuantity: (item, newQuantity) =>
    dispatch(changeQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
