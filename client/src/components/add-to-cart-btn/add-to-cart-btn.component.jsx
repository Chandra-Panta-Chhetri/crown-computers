import React from "react";
import { AddToCartBtnContainer } from "./add-to-cart-btn.styles";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { selectCartItemQuantityById } from "../../redux/cart/cart.selectors";

const AddToCartButton = ({
  addToCart,
  itemToAddOnClick,
  itemQuantityInCart
}) => (
  <AddToCartBtnContainer
    onClick={() => addToCart(itemToAddOnClick)}
    disabled={itemQuantityInCart === itemToAddOnClick.stock}
    isDisabled={itemQuantityInCart === itemToAddOnClick.stock}
  >
    Add To Cart
  </AddToCartBtnContainer>
);

const mapStateToProps = (state, ownProps) => ({
  itemQuantityInCart: selectCartItemQuantityById(
    ownProps.itemToAddOnClick.productId
  )(state)
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
