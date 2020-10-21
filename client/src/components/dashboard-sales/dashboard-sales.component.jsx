import React from "react";
import { Sales } from "./dashboard-sales.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import SalesSummary from "../sales-summary/sales-summary.component";

const DashboardSales = () => {
  return (
    <>
      <DashboardContentTitle>Sales</DashboardContentTitle>
      <SalesSummary />
      <Sales />
    </>
  );
};

export default DashboardSales;
