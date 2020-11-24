import React from "react";
import { CardContainer } from "./card.styles";

const Card = ({ children, width = "100%", height = "100%", className }) => (
  <CardContainer width={width} height={height} className={className}>
    {children}
  </CardContainer>
);

export default Card;
