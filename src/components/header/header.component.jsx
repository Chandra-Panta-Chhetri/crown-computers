import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";

export const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <i class="fas fa-crown fa-3x"></i>
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
