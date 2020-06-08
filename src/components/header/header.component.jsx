import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { auth } from "../../utils/firebase";

export const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="options">
        <Link className="option" to="/collection">
          Collection
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
          <Link className="option" to="/signup">
            Sign Up
          </Link>
        ) : null}
      </div>
    </div>
  );
};
