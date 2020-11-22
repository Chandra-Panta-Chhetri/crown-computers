import React, { useState } from "react";
import {
  SideNavContainer,
  Navbar,
  NavbarBrand,
  AdminName,
  SideNavTitle,
  NavMenu,
  NavMenuItems,
  NavMenuClose,
  MenuBars,
  NavMenuOption,
  LogOutOption
} from "./side-nav.styles";

import { NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { startLogOut } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { truncate } from "../../global.utils";

const SideNav = ({ match, logOut, currentUser, navOptions = [] }) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const toggleMenuVisibility = () => setIsMenuShown(!isMenuShown);

  return (
    <SideNavContainer>
      <Navbar>
        <NavbarBrand>
          <MenuBars>
            <i className="fas fa-bars" onClick={toggleMenuVisibility} />
          </MenuBars>
          <AdminName>
            {currentUser && truncate(currentUser.fullName)}
            <i className="fas fa-user-shield" />
          </AdminName>
        </NavbarBrand>
        <div>
          <SideNavTitle>Dashboard</SideNavTitle>
        </div>
      </Navbar>
      <NavMenu isMenuShown={isMenuShown}>
        <NavMenuItems onClick={toggleMenuVisibility}>
          <NavMenuClose>
            <span>
              <i className="fas fa-times" />
            </span>
          </NavMenuClose>
          {navOptions.map((option, index) => {
            return (
              <NavMenuOption key={index}>
                <NavLink
                  to={`${match.path}/${option.path}`}
                  activeClassName="active-nav-menu-option"
                >
                  <i className={option.iconClass} />
                  <span>{option.title}</span>
                </NavLink>
              </NavMenuOption>
            );
          })}
          <LogOutOption onClick={logOut}>
            <NavLink to="/login">
              <i className="fas fa-sign-out-alt" />
              <span>Log Out</span>
            </NavLink>
          </LogOutOption>
        </NavMenuItems>
      </NavMenu>
    </SideNavContainer>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SideNav);
