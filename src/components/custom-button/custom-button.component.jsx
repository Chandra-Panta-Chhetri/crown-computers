import React from "react";
import "./custom-button.styles.scss";

export const CustomButton = ({ children, ...otherButtonAttr }) => {
  return (
    <button className="custom-button" {...otherButtonAttr}>
      {children}
    </button>
  );
};
