import React from "react";
import {
  CartDropDownContainer,
  CartDropDownHeader,
  CartTotal,
  LighterText
} from "./cart-drop-down.styles";

import CartItems from "../cart-items/cart-items.component";
import Button from "../button/button.component";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { roundNumber } from "../../global.utils";
import { selectCartTotal } from "../../redux/cart/cart.selectors";

const CartDropDown = ({ history, cartTotal }) => (
  <CartDropDownContainer>
    <CartDropDownHeader>
      <CartTotal>
        <LighterText>Total:</LighterText>
        <span>${roundNumber(cartTotal)}</span>
      </CartTotal>
    </CartDropDownHeader>
    <CartItems />
    <Button onClick={() => history.push("/cart-summary")}>Checkout</Button>
  </CartDropDownContainer>
);

const mapStateToProps = (state) => ({
  cartTotal: selectCartTotal(state)
});

export default compose(connect(mapStateToProps), withRouter)(CartDropDown);
