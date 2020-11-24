import React from "react";
import {
  FullPageSpinnerContainer,
  FullPageSpinnerText
} from "./full-page-spinner.styles";

const FullPageSpinner = ({ isLoading, loadingText = "Loading" }) => (
  <FullPageSpinnerContainer isLoading={isLoading}>
    <FullPageSpinnerText>{loadingText}</FullPageSpinnerText>
  </FullPageSpinnerContainer>
);

export default FullPageSpinner;
