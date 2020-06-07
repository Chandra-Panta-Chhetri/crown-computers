import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/crown.svg";
import { auth } from "../../configs/firebaseConfig";

export const Header = ({ currentUser }) => {
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
        {!currentUser ? (
          <Link className="option" to="/login">
            Log In
          </Link>
        ) : (
          <Link className="option" onClick={() => auth.signOut()} to="/">
            Log Out
          </Link>
        )}
        {!currentUser ? (
          <Link className="option" to="/register">
            Sign Up
          </Link>
        ) : null}
      </div>
    </div>
  );
};
