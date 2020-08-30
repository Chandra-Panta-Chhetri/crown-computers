import React, { useState } from "react";

import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import CheckoutFrom from "../checkout-form/checkout-form.component";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutButton = ({ price, label }) => {
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
          <CheckoutFrom price={price} />
        </Elements>
      </Modal>
    </>
  );
};

export default StripeCheckoutButton;
