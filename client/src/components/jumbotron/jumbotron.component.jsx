import React from "react";
import { JumbotronContainer, Title, Subtitle } from "./jumbotron.styles";

const Jumbotron = ({ title, subtitle, children }) => (
  <JumbotronContainer>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    {children}
  </JumbotronContainer>
);

export default Jumbotron;
