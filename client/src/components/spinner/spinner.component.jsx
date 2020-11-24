import React from "react";
import {
  SpinnerContainer,
  SpinnerOverlay,
  SpinnerText
} from "./spinner.styles";

const Spinner = ({ loadingText = "Loading" }) => (
  <SpinnerOverlay>
    <SpinnerContainer />
    <SpinnerText>{loadingText}</SpinnerText>
  </SpinnerOverlay>
);

export default Spinner;
