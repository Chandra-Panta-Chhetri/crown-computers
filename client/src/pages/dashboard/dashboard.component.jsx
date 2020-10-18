import React, { lazy } from "react";
import { DashboardContainer } from "./dashboard.styles";

import { Switch, Route, Redirect } from "react-router-dom";
import SideNav from "../../components/side-nav/side-nav.component";

const DashboardSales = lazy(() =>
  import("../../components/dashboard-sales/dashboard-sales.component")
);

const Dashboard = ({ match }) => (
  <DashboardContainer>
    <SideNav />
    <Switch>
      <Route
        exact
        path={match.path}
        render={() => <Redirect to={`${match.path}/sales`} />}
      />
      <Route exact path={`${match.path}/sales`} component={DashboardSales} />
      <Route exact path={`${match.path}/products`} component={DashboardSales} />
      <Route
        exact
        path={`${match.path}/product-categories`}
        component={DashboardSales}
      />

      <Route render={() => <Redirect to={`${match.path}/sales`} />} />
    </Switch>
  </DashboardContainer>
);

export default Dashboard;
