import React from "react";
import { CartItemsContainer, EmptyCartText } from "./cart-items.styles";

import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShoppingCart } from "../../redux/cart/cart.selectors";

const CartItems = ({ shoppingCart }) => (
  <>
    {shoppingCart.length ? (
      <CartItemsContainer>
        {shoppingCart.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </CartItemsContainer>
    ) : (
      <EmptyCartText>
        Once you add items to your cart, they will appear here!
      </EmptyCartText>
    )}
  </>
);

const mapStateToProps = createStructuredSelector({
  shoppingCart: selectShoppingCart
});

export default connect(mapStateToProps)(CartItems);
