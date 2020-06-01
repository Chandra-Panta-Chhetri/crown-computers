import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/crown.svg";

export const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="options">
        <Link className="option" to="/shop">
          Shop
        </Link>
        <Link className="option" to="/login">
          Log In
        </Link>
        <Link className="option" to="/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
