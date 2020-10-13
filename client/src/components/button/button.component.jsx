import React from "react";
import {
  DefaultButton,
  ButtonWithIcon,
  ButtonWithNoBorder
} from "./button.styles";
import { secondaryColor } from "../../global.styles";

const Button = ({
  children,
  iconClass = "",
  variant = "default",
  color = secondaryColor,
  ...otherButtonAttr
}) => {
  switch (variant) {
    case "icon":
      return (
        <ButtonWithIcon {...otherButtonAttr} color={color}>
          <i className={iconClass} /> <span>{children}</span>
        </ButtonWithIcon>
      );
    case "no-border":
      return (
        <ButtonWithNoBorder {...otherButtonAttr} color={color}>
          <i className={iconClass} /> <span>{children}</span>
        </ButtonWithNoBorder>
      );
    default:
      return (
        <DefaultButton {...otherButtonAttr} color={color}>
          {children}
        </DefaultButton>
      );
  }
};

export default Button;
