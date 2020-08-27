import React from "react";
import { FullPageSpinnerContainer } from "./full-page-spinner.styles";

const FullPageSpinner = ({ isLoading }) => (
  <FullPageSpinnerContainer isLoading={isLoading}></FullPageSpinnerContainer>
);

export default FullPageSpinner;
