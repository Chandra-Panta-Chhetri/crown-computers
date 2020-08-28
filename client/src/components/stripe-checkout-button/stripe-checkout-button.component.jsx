import React, { useState } from "react";

import Button from "../button/button.component";
import Modal from "../modal/modal.component";

import axios from "axios";

const StripeCheckoutButton = ({ price, label }) => {
  const priceInCents = price * 100;
  const [isOpen, setIsOpen] = useState(false);

  const onToken = async (stripeToken) => {
    try {
      stripeToken.amount = priceInCents;
      const response = await axios.post("/checkout", stripeToken);
      console.log(response);
    } catch (e) {
      alert(`Payment failed. Please try again! ${e.response.data.msg}`);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{label}</Button>
      <Modal isOpen={isOpen} closeModalHandler={() => setIsOpen(false)}>
        <p>hi</p>
      </Modal>
    </>
  );
};

//For testing 4242424242424242

export default StripeCheckoutButton;
