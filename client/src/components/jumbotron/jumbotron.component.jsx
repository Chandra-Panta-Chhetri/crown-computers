import React from "react";
import { JumbotronContainer, Title, SubTitle } from "./jumbotron.styles";

import Button from "../button/button.component";

import { withRouter } from "react-router-dom";

const Jumbotron = ({ history }) => (
  <JumbotronContainer>
    <Title>Welcome to Crown Computers!</Title>
    <SubTitle>A one-stop shop for all your computer needs</SubTitle>
    <Button onClick={() => history.push("/shop")}>Browse Collection</Button>
  </JumbotronContainer>
);

export default withRouter(Jumbotron);
