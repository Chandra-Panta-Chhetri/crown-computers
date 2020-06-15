import React from "react";
import "./cart-dropdown.styles.scss";

import { Button } from "../button/button.component";

export const CartDropDown = () => {
  return (
    <article className="cart-drop-down">
      <div className="cart-items">Your cart is empty</div>
      <Button onClick={() => console.log("shopping button clicked")}>
        View Cart
      </Button>
    </article>
  );
};
