import React from "react";
import { ViewCartButton as GoHomeButton } from "../cart-drop-down/cart-drop-down.styles";
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText
} from "../error-boundary/error-boundary.styles";

import { withRouter } from "react-router-dom";

const PageNotFound = ({ history }) => (
  <ErrorImageOverlay>
    <ErrorImageContainer imageUrl="https://i.imgur.com/Q2BAOd2.png" />
    <ErrorImageText>
      404 <br />
      Sorry, requested page not found
    </ErrorImageText>
    <GoHomeButton onClick={() => history.push("/")}>
      Go Back To Home
    </GoHomeButton>
  </ErrorImageOverlay>
);

export default withRouter(PageNotFound);
