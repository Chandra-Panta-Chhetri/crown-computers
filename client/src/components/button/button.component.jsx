import React from "react";
import { ButtonContainer, ButtonWithIconContainer } from "./button.styles";

const Button = ({
  children,
  type = "default",
  iconClass,
  ...otherButtonAttr
}) => (
  <>
    {type === "default" && (
      <ButtonContainer {...otherButtonAttr}>{children}</ButtonContainer>
    )}
    {type === "icon" && (
      <ButtonWithIconContainer {...otherButtonAttr}>
        <i className={iconClass}></i> <span>{children}</span>
      </ButtonWithIconContainer>
    )}
  </>
);

export default Button;
