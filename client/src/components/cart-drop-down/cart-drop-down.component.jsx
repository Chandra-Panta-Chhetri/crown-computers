import React from "react";
import { CartDropDownContainer, ViewCartButton } from "./cart-drop-down.styles";

import CartItems from "../cart-items/cart-items.component";

import { withRouter } from "react-router-dom";

const CartDropDown = ({ history }) => (
  <CartDropDownContainer>
    <CartItems />
    <ViewCartButton onClick={() => history.push("/cart-summary")}>
      View Cart
    </ViewCartButton>
  </CartDropDownContainer>
);

export default withRouter(CartDropDown);
