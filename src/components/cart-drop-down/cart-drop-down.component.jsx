import React from "react";
import "./cart-drop-down.styles.scss";

import Button from "../button/button.component";
import CartItems from "../cart-items/cart-items.component";

import { withRouter } from "react-router-dom";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CartDropDown = ({ history, toggleCartVisibility }) => (
  <article className="cart-drop-down">
    <CartItems />
    <Button
      onClick={() => {
        history.push("/cart-summary");
        toggleCartVisibility();
      }}
    >
      View Cart
    </Button>
  </article>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default withRouter(connect(null, mapDispatchToProps)(CartDropDown));
