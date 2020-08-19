import React from "react";

import Spinner from "../spinner/spinner.component";

const withSpinner = (WrappedComponent) => ({
  isLoading,
  loadingText,
  ...otherProps
}) =>
  isLoading ? (
    <Spinner loadingText={loadingText} />
  ) : (
    <WrappedComponent {...otherProps} />
  );

export default withSpinner;
