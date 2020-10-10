import React from "react";

import Button from "../button/button.component";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { selectCartItemQuantityById } from "../../redux/cart/cart.selectors";

const AddToCartButton = ({
  addToCart,
  itemsToAddOnClick = [],
  itemQuantityInCart,
  className,
  label = "Add To Cart"
}) => {
  const addItemsToCart = () => {
    for (const item of itemsToAddOnClick) {
      addToCart(item);
    }
  };

  return (
    <Button
      className={className}
      onClick={addItemsToCart}
      disabled={
        itemsToAddOnClick.length === 1 &&
        itemQuantityInCart === itemsToAddOnClick[0].stock
      }
    >
      {label}
    </Button>
  );
};

const mapStateToProps = (state, ownProps) => ({
  itemQuantityInCart: selectCartItemQuantityById(
    ownProps.itemsToAddOnClick[0].productId
  )(state)
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
