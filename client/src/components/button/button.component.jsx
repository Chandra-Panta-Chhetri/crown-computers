import React from "react";
import { ButtonContainer, ButtonWithIconContainer } from "./button.styles";

const Button = ({
  children,
  isIconButton = false,
  iconClass,
  ...otherButtonAttr
}) => (
  <>
    {isIconButton ? (
      <ButtonWithIconContainer {...otherButtonAttr}>
        <i className={iconClass}></i> <span>{children}</span>
      </ButtonWithIconContainer>
    ) : (
      <ButtonContainer {...otherButtonAttr}>{children}</ButtonContainer>
    )}
  </>
);

export default Button;
