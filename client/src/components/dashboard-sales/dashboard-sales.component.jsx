import React, { useEffect } from "react";
import { Sales, Subtitle } from "./dashboard-sales.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import Skeleton from "../skeleton/skeleton.component";

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
  useEffect(() => {
    fetchSalesSummary();
  }, [fetchSalesSummary]);

  return (
    <>
      <DashboardContentTitle>Sales</DashboardContentTitle>
      {isFetchingSalesSummary ? (
        <Skeleton height="30px" margin="0 0 12px" count={2} width="40%" />
      ) : (
        <>
          <Subtitle>Total Profit: ${salesSummary.salesTotal}</Subtitle>
          <Subtitle>
            Total Products Sold: {salesSummary.totalProductsSold}
          </Subtitle>
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
