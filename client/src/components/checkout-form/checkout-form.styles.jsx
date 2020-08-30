import styled from "styled-components";

import Button from "../button/button.component";

export const CheckoutFormContainer = styled.form`
  width: 100%;
`;

export const SubHeading = styled.h4`
  font-weight: bold;
  letter-spacing: 1.6px;
`;

export const PayNowButton = styled(Button)`
  margin-top: 25px;
  width: 100%;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: black;
  color: white;

  &:hover {
    background-color: gainsboro;
    color: black;
  }
`;

export const CardElementContainer = styled.div`
  & .StripeElement {
    width: 100%;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid grey;
  }
`;

export const cardElementStyles = {
  base: {
    color: "black",
    fontSize: "17px",
    iconColor: "black",
    "::placeholder": {
      color: "black"
    }
  },
  invalid: {
    iconColor: "red",
    color: "red"
  },
  complete: {
    iconColor: "black"
  }
};

export const ErrorText = styled.p`
  text-align: center;
  font-weight: bold;
  color: red;
  letter-spacing: 0.8px;
  margin-bottom: 0px;
`;
