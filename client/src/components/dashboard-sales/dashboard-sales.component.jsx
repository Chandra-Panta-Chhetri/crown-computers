import React, { useEffect } from "react";
import { Sales } from "./dashboard-sales.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import Skeleton from "../skeleton/skeleton.component";
import Banner from "../banner/banner.component";

import { connect } from "react-redux";
import { startSalesSummaryFetch } from "../../redux/sale/sale.actions";
import {
  selectSalesSummary,
  selectIsFetchingSalesSummary
} from "../../redux/sale/sale.selectors";

const DashboardSales = ({
  isFetchingSalesSummary,
  salesSummary,
  fetchSalesSummary
}) => {
  const { salesTotal, totalProductsSold, totalNumSales } = salesSummary;
  useEffect(() => {
    fetchSalesSummary();
  }, [fetchSalesSummary]);

  return (
    <>
      <DashboardContentTitle>Sales</DashboardContentTitle>
      {isFetchingSalesSummary ? (
        <Skeleton height="30px" margin="0 0 12px" count={3} />
      ) : (
        <>
          <Banner label="Total Sales" value={totalNumSales} />
          <Banner label="Total Revenue" value={`$${salesTotal}`} />
          <Banner label="Total Products Sold" value={totalProductsSold} />
        </>
      )}
      <Sales />
    </>
  );
};

const mapStateToProps = (state) => ({
  isFetchingSalesSummary: selectIsFetchingSalesSummary(state),
  salesSummary: selectSalesSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesSummary: () => dispatch(startSalesSummaryFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSales);
