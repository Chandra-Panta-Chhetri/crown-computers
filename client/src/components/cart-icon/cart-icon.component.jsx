import React from "react";
import { CartIconContainer, ShoppingCartIcon } from "./cart-icon.styles";

import Badge from "../badge/badge.component";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { selectNumCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const CartIcon = ({ numItemsInCart, toggleCartVisibility, history }) => {
  const toggleCartDropDown = () => {
    const screenWidth = window.screen.availWidth;
    if (screenWidth > 400) {
      return toggleCartVisibility();
    }
    return history.push("/cart-summary");
  };

  return (
    <CartIconContainer onClick={toggleCartDropDown}>
      <ShoppingCartIcon>
        <i className="fas fa-shopping-cart"></i>
      </ShoppingCartIcon>
      <Badge text={numItemsInCart} />
    </CartIconContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  numItemsInCart: selectNumCartItems
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CartIcon);
