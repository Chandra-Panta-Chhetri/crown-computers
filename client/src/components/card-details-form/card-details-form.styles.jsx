import styled from "styled-components";
import { loadingDotsAnimationStyles } from "../spinner/spinner.styles";

export const LoadingText = styled.p`
  margin: 0;
  ${loadingDotsAnimationStyles}
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
    iconColor: "black"
  },
  invalid: {
    iconColor: "red",
    color: "red"
  },
  complete: {
    iconColor: "black"
  }
};
