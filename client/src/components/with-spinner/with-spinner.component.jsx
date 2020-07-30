import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) =>
  isLoading ? (
    <SpinnerContainer>
      <SpinnerOverlay />
    </SpinnerContainer>
  ) : (
    <WrappedComponent {...otherProps} />
  );

export default withSpinner;
