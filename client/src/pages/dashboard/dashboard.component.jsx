import React, { lazy } from "react";
import { DashboardContainer } from "./dashboard.styles";

import { Switch, Route, Redirect } from "react-router-dom";
import SideNav from "../../components/side-nav/side-nav.component";

const DashboardSales = lazy(() =>
  import("../../components/dashboard-sales/dashboard-sales.component")
);

const dashboardNavOptions = [
  { title: "Sales", path: "sales", iconClass: "fas fa-chart-line" },
  { title: "Products", path: "products", iconClass: "fas fa-shopping-basket" },
  {
    title: "Product Categories",
    path: "product-categories",
    iconClass: "fas fa-shopping-bag"
  }
];

const Dashboard = ({ match }) => (
  <DashboardContainer>
    <SideNav navOptions={dashboardNavOptions} />
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
