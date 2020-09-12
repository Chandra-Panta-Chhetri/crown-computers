import React from "react";
import { CartSummaryContainer, NoCartItemsText } from "./cart-summary.styles";

import CartSummaryItems from "../../components/cart-summary-items/cart-summary-items.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import FullPageSpinner from "../../components/full-page-spinner/full-page-spinner.component";

import { connect } from "react-redux";
import {
  selectShoppingCart,
  selectCartTotal,
  selectIsUpdatingCart,
  selectCartLoadingText
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartSummary = ({
  cartItems,
  cartTotal,
  isUpdatingCart,
  cartLoadingText
}) => (
  <CartSummaryContainer>
    {cartItems.length ? (
      <>
        <CartSummaryItems cartItems={cartItems} />
        <OrderSummary cartTotal={cartTotal} />
      </>
    ) : (
      <NoCartItemsText>
        Once you add items to your cart, they will appear here!
      </NoCartItemsText>
    )}
    <FullPageSpinner isLoading={isUpdatingCart} loadingText={cartLoadingText} />
  </CartSummaryContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectShoppingCart,
  cartTotal: selectCartTotal,
  isUpdatingCart: selectIsUpdatingCart,
  cartLoadingText: selectCartLoadingText
});

export default connect(mapStateToProps)(CartSummary);
