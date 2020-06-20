import React from "react";
import "./cart-dropdown.styles.scss";

import { Button } from "../button/button.component";
import { CartItem } from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";

const CartDropDown = ({ shoppingCart, history }) => (
  <article className="cart-drop-down">
    <div className="cart-items">
      {!shoppingCart.length ? (
        <span className="empty-cart">Your cart is empty</span>
      ) : (
        shoppingCart.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
    <Button onClick={() => history.push("/checkout")}>View Cart</Button>
  </article>
);

const mapStateToProps = (state) => ({ shoppingCart: selectCartItems(state) });

export default withRouter(connect(mapStateToProps)(CartDropDown));
