import styled from "styled-components";

import { loadingDotsAnimationStyles } from "../spinner/spinner.styles";

import Button from "../button/button.component";

export const LoadingText = styled.p`
  margin: 0;
  ${loadingDotsAnimationStyles}
`;

export const PayNowButton = styled(Button)`
  float: right;

  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const CardElementContainer = styled.div`
  margin-bottom: 25px;

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