import React from "react";
import { SideNavContainer } from "./side-nav.styles";

import { NavLink, withRouter } from "react-router-dom";

const SideNav = ({ match }) => (
  <SideNavContainer>
    <NavLink
      to={`${match.path}/sales`}
      activeClassName="dashboard-active-option"
    >
      Sales
    </NavLink>
    <NavLink
      to={`${match.path}/products`}
      activeClassName="dashboard-active-option"
    >
      Products
    </NavLink>
    <NavLink
      to={`${match.path}/product-categories`}
      activeClassName="dashboard-active-option"
    >
      Product Categories
    </NavLink>
  </SideNavContainer>
);

export default withRouter(SideNav);
