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
  NavMenuOption
} from "./side-nav.styles";

import { NavLink, withRouter } from "react-router-dom";
import Button from "../button/button.component";

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
          <Button onClick={() => logOut()}>Log Out</Button>
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
