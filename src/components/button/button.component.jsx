import React from "react";
import "./button.styles.scss";

const Button = ({ children, ...otherButtonAttr }) => (
  <button className="button" {...otherButtonAttr}>
    {children}
  </button>
);

export default Button;
