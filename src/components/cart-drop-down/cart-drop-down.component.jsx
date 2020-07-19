import React from "react";
import { CartDropDownContainer, ViewCartButton } from "./cart-drop-down.styles";

import CartItems from "../cart-items/cart-items.component";

import { withRouter } from "react-router-dom";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CartDropDown = ({ history, toggleCartVisibility }) => (
  <CartDropDownContainer>
    <CartItems />
    <ViewCartButton
      onClick={() => {
        history.push("/cart-summary");
        toggleCartVisibility();
      }}
    >
      View Cart
    </ViewCartButton>
  </CartDropDownContainer>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default withRouter(connect(null, mapDispatchToProps)(CartDropDown));
