import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { connect } from "react-redux";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <i className="fas fa-crown fa-3x"></i>
        </Link>
      </div>
      <div className="options">
        <Link className="option" to="/collection">
          Collection
        </Link>
        {!currentUser ? (
          <Link className="option" to="/login">
            Log In <i className="fas fa-sign-in-alt"></i>
          </Link>
        ) : (
          <Link className="option" onClick={() => auth.signOut()} to="/">
            Log Out
          </Link>
        )}
        {!currentUser ? (
          <Link className="option" to="/signup">
            Sign Up <i className="fas fa-user-plus"></i>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
