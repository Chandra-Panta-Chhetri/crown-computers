import React from "react";
import "./form-input.styles.scss";

export const FormInput = ({ label, handler, ...otherFieldProps }) => {
  return (
    <div className="group">
      <label
        className={`form-input-label ${
          otherFieldProps.value.length ? "shrink" : ""
        }`}
      >
        {label}
      </label>
      <input className="form-input" onChange={handler} {...otherFieldProps} />
    </div>
  );
};
