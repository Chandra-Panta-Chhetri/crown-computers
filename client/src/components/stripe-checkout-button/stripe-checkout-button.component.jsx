import React, { useState } from "react";
import { CheckoutModal } from "./stripe-checkout-button.styles";

import Button from "../button/button.component";
import CheckoutFrom from "../checkout-form/checkout-form.component";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { withRouter } from "react-router-dom";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutButton = ({ price, label, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="icon"
        iconClass="far fa-credit-card fa-2x"
      >
        {label}
      </Button>
      <CheckoutModal
        isOpen={isOpen}
        closeModalHandler={() => setIsOpen(false)}
        modalTitle="Checkout"
      >
        <Elements stripe={stripe}>
          <CheckoutFrom
            amountToBePaid={price}
            onSuccessfulCheckout={() => history.push("/")}
          />
        </Elements>
      </CheckoutModal>
    </>
  );
};

export default withRouter(StripeCheckoutButton);
