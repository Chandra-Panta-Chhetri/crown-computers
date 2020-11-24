import React, { lazy } from "react";
import { DashboardContainer, DashboardContent } from "./dashboard.styles";

import { Switch, Route, Redirect } from "react-router-dom";
import SideNav from "../../components/side-nav/side-nav.component";

const DashboardSales = lazy(() =>
  import("../../components/dashboard-sales/dashboard-sales.component")
);
const DashboardProductCategories = lazy(() =>
  import(
    "../../components/dashboard-product-categories/dashboard-product-categories.component"
  )
);
const DashboardProducts = lazy(() =>
  import("../../components/dashboard-products/dashboard-products.component")
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
    <DashboardContent>
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => <Redirect to={`${match.path}/sales`} />}
        />
        <Route exact path={`${match.path}/sales`} component={DashboardSales} />
        <Route
          exact
          path={`${match.path}/products`}
          component={DashboardProducts}
        />
        <Route
          exact
          path={`${match.path}/product-categories`}
          component={DashboardProductCategories}
        />

        <Route render={() => <Redirect to={`${match.path}/sales`} />} />
      </Switch>
    </DashboardContent>
  </DashboardContainer>
);

export default Dashboard;
