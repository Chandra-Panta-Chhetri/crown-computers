import React from "react";
import { ButtonContainer } from "./button.styles";

const Button = ({ children, ...otherButtonAttr }) => (
  <ButtonContainer {...otherButtonAttr}>{children}</ButtonContainer>
);

export default Button;
