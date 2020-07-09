import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, handler, ...otherFieldProps }) => (
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

export default FormInput;
