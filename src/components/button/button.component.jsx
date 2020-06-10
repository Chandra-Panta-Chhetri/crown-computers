import React from "react";
import "./button.styles.scss";

export const Button = ({ children, stretch, ...otherButtonAttr }) => {
  return (
    <button
      className={`button ${stretch ? "stretch" : ""}`}
      {...otherButtonAttr}
    >
      {children}
    </button>
  );
};
