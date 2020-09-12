import styled from "styled-components";
import { loadingDotsAnimationStyles } from "../spinner/spinner.styles";

import Button from "../button/button.component";

export const CheckoutFormContainer = styled.form`
  width: 100%;
`;

export const SubHeading = styled.h4`
  font-weight: bold;
`;

export const LoadingText = styled.p`
  margin: 0;
  ${loadingDotsAnimationStyles}
`;

export const PayNowButton = styled(Button)`
  margin-top: 25px;
  width: 100%;

  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
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
