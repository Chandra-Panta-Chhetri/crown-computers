import React from "react";
import "./button.styles.scss";

export const Button = ({ children, ...otherButtonAttr }) => {
  return (
    <button
      className={`button ${otherButtonAttr.stretch ? "stretch" : ""}`}
      {...otherButtonAttr}
    >
      {children}
    </button>
  );
};
