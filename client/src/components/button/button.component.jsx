import React from "react";
import { ButtonContainer, ButtonWithIconContainer } from "./button.styles";
import { secondaryColor } from "../../global.styles";

const Button = ({
  children,
  isIconButton = false,
  iconClass,
  color = secondaryColor,
  ...otherButtonAttr
}) => (
  <>
    {isIconButton ? (
      <ButtonWithIconContainer {...otherButtonAttr} color={color}>
        <i className={iconClass}></i> <span>{children}</span>
      </ButtonWithIconContainer>
    ) : (
      <ButtonContainer {...otherButtonAttr} color={color}>
        {children}
      </ButtonContainer>
    )}
  </>
);

export default Button;
