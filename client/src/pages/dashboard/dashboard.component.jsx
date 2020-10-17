import React, { lazy } from "react";
import { DashboardContainer } from "./dashboard.styles";

import { Switch, Route } from "react-router-dom";
import SideNav from "../../components/side-nav/side-nav.component";

const DashboardSales = lazy(() =>
  import("../../components/dashboard-sales/dashboard-sales.component")
);

const Dashboard = ({ match }) => (
  <DashboardContainer>
    <SideNav />
    <Switch>
      <Route exact path={`${match.path}/sales`} component={DashboardSales} />
    </Switch>
  </DashboardContainer>
);

export default Dashboard;
