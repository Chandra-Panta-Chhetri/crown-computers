import React from "react";
import "./button.styles.scss";

export const Button = ({ children, ...otherButtonAttr }) => (
  <button className="button" {...otherButtonAttr}>
    {children}
  </button>
);
