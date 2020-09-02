import React, { useState } from "react";

import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import CheckoutFrom from "../checkout-form/checkout-form.component";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { withRouter } from "react-router-dom";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutButton = ({ price, label, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{label}</Button>
      <Modal
        isOpen={isOpen}
        closeModalHandler={() => setIsOpen(false)}
        modalTitle="Billing & Shipping Details"
      >
        <Elements stripe={stripe}>
          <CheckoutFrom
            price={price}
            onSuccessfulCheckout={() => history.push("/")}
          />
        </Elements>
      </Modal>
    </>
  );
};

export default withRouter(StripeCheckoutButton);
