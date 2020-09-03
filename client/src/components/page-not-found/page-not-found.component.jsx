import React from "react";
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText
} from "../error-boundary/error-boundary.styles";

import Button from "../button/button.component";

import { withRouter } from "react-router-dom";

const PageNotFound = ({ history }) => (
  <ErrorImageOverlay>
    <ErrorImageContainer imageUrl="https://i.imgur.com/Q2BAOd2.png" />
    <ErrorImageText>
      404 <br />
      Sorry, requested page not found
    </ErrorImageText>
    <Button onClick={() => history.push("/")}>Go Back To Home</Button>
  </ErrorImageOverlay>
);

export default withRouter(PageNotFound);
