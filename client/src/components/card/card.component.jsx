import React from "react";
import { CardContainer } from "./card.styles";

const Card = ({ children, width = "100%", height = "100%" }) => (
  <CardContainer width={width} height={height}>
    {children}
  </CardContainer>
);

export default Card;
