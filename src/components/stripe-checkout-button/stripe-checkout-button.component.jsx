import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "../button/button.component";

class StripeCheckOutButton extends React.Component {
  onToken = (token) => {
    console.log("here is the token ", token);
  };

  render() {
    const { price, label } = this.props;
    return (
      <StripeCheckout
        name="Crown Computers"
        amount={price * 100}
        currency="CAD"
        email="chandra.panta345@hotmail.com"
        shippingAddress
        billingAddress={true}
        token={this.onToken}
        stripeKey="pk_test_51H2dKlGzDF5ZEPUIwxzCtFWIicqIlBU4ZJJ09f6XxAZX7O3spzP8FJrjZrB5Ey2VjY7oNZy3byehChIfHcOzjEpv002BfotJtp"
      >
        <Button>{label}</Button>
      </StripeCheckout>
    );
  }
}

//For testing 4242424242424242

export default StripeCheckOutButton;
