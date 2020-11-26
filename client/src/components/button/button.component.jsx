import React from "react";
import {
  DefaultButton,
  ButtonWithIcon,
  ButtonWithNoBorder
} from "./button.styles";

const Button = ({
  children,
  iconClass = "",
  variant,
  color,
  className,
  ...otherButtonAttr
}) => {
  switch (variant) {
    case "icon":
      return (
        <ButtonWithIcon
          {...otherButtonAttr}
          color={color}
          className={className}
        >
          <i className={iconClass} /> <span>{children}</span>
        </ButtonWithIcon>
      );
    case "no-border":
      return (
        <ButtonWithNoBorder
          {...otherButtonAttr}
          color={color}
          className={className}
        >
          <i className={iconClass} /> <span>{children}</span>
        </ButtonWithNoBorder>
      );
    default:
      return (
        <DefaultButton {...otherButtonAttr} color={color} className={className}>
          {children}
        </DefaultButton>
      );
  }
};

export default Button;
