import React, { useState } from "react";
import { SideNavContainer } from "./side-nav.styles";

import { NavLink, withRouter, Link } from "react-router-dom";
import Button from "../button/button.component";

import { connect } from "react-redux";
import { compose } from "redux";
import { logOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const sideNavOptions = [
  { title: "Sales", path: "sales", iconClass: "fas fa-chart-line" },
  { title: "Products", path: "products", iconClass: "fas fa-shopping-basket" },
  {
    title: "Product Categories",
    path: "product-categories",
    iconClass: "fas fa-shopping-bag"
  }
];

const SideNav = ({ match, logOut, currentUser }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleSideNav = () => setIsShown(!isShown);

  return (
    <SideNavContainer>
      <div className="navbar">
        <div>
          <Link to="#" className="menu-bars">
            <i className="fas fa-bars" onClick={toggleSideNav} />
          </Link>
          <span className="admin-name">
            {currentUser && currentUser.fullName}
            <i className="fas fa-user-shield" />
          </span>
        </div>
        <div>
          <span>Dashboard</span>
          <Button onClick={() => logOut()}>Log Out</Button>
        </div>
      </div>
      <nav className={isShown ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={toggleSideNav}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <i className="fas fa-times" />
            </Link>
          </li>
          {sideNavOptions.map((option, index) => {
            return (
              <li key={index} className="nav-text">
                <NavLink
                  to={`${match.path}/${option.path}`}
                  activeClassName="active-nav-option"
                >
                  <i className={option.iconClass} />
                  <span>{option.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </SideNavContainer>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutStart())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SideNav);
