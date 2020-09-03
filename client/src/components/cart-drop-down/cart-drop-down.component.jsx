import React from "react";
import { CartDropDownContainer } from "./cart-drop-down.styles";

import CartItems from "../cart-items/cart-items.component";
import Button from "../button/button.component";

import { withRouter } from "react-router-dom";

const CartDropDown = ({ history }) => (
  <CartDropDownContainer>
    <CartItems />
    <Button onClick={() => history.push("/cart-summary")}>Checkout</Button>
  </CartDropDownContainer>
);

export default withRouter(CartDropDown);
