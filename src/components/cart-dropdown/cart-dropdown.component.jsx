import React from "react";
import "./cart-dropdown.styles.scss";

import { Button } from "../button/button.component";
import { CartItem } from "../cart-item/cart-item.component";

import { connect } from "react-redux";

const CartDropDown = ({ shoppingCart }) => (
  <article className="cart-drop-down">
    <div className="cart-items">
      {!shoppingCart.length ? (
        <span className="empty-cart">Your cart is empty</span>
      ) : (
        shoppingCart.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
    <Button onClick={() => console.log("See Cart Btn clicked")}>
      View Cart
    </Button>
  </article>
);

const mapStateToProps = ({ cart: { shoppingCart } }) => ({ shoppingCart });

export default connect(mapStateToProps)(CartDropDown);
