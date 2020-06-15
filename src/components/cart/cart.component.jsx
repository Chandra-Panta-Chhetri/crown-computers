import React from "react";
import "./cart.styles.scss";
import { Button } from "../button/button.component";

export const Cart = () => {
  return (
    <article className="cart">
      <div className="cart-info">Your cart is empty</div>
      <Button onClick={() => console.log("shopping button clicked")}>
        View Cart
      </Button>
    </article>
  );
};
