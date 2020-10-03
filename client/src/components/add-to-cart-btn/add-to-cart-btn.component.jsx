import React from "react";

import Button from "../button/button.component";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { selectCartItemQuantityById } from "../../redux/cart/cart.selectors";

const AddToCartButton = ({
  addToCart,
  itemToAddOnClick,
  itemQuantityInCart,
  className
}) => (
  <Button
    className={className}
    onClick={() => addToCart(itemToAddOnClick)}
    disabled={itemQuantityInCart === itemToAddOnClick.stock}
  >
    Add To Cart
  </Button>
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
