import React from "react";
import "./cart-drop-down.styles.scss";

import { Button } from "../button/button.component";
import { CartItem } from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";

const CartDropDown = ({ shoppingCart, history, dispatch }) => (
  <article className="cart-drop-down">
    <div className="cart-items">
      {!shoppingCart.length ? (
        <span className="empty-cart">Your cart is empty</span>
      ) : (
        shoppingCart.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
    <Button
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartVisibility());
      }}
    >
      View Cart
    </Button>
  </article>
);

const mapStateToProps = createStructuredSelector({
  shoppingCart: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown));
