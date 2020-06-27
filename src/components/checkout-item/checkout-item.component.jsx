import React from "react";
import "./checkout-item.styles.scss";

import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeQuantity }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <article className="checkout-item">
      <section className="item-meta">
        <div className="product-image">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="item-modification">
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
          <span className="remove" onClick={() => removeItem(item)}>
            <i className="fas fa-trash"></i> Remove
          </span>
        </div>
      </section>
      <span className="price">${price * quantity}</span>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeQuantity: (item, newQuantity) =>
    dispatch(changeQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
