import React, { useEffect } from "react";
import { SalesList, Subtitle } from "./dashboard-sales.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import SaleEntry from "../sale-entry/sale-entry.component";
import Skeleton from "../skeleton/skeleton.component";

import { connect } from "react-redux";
import {
  startInitialSalesFetch,
  startLoadingMoreSales,
  startSalesSummaryFetch
} from "../../redux/sale/sale.actions";
import {
  selectIsFetchingSales,
  selectSales,
  selectHasMoreSalesToFetch,
  selectSalesPerPage,
  selectSalesSummary,
  selectIsFetchingSalesSummary
} from "../../redux/sale/sale.selectors";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { createStructuredSelector } from "reselect";

const DashboardSales = ({
  sales,
  isFetchingSales,
  fetchSales,
  fetchMoreSales,
  hasMoreSalesToFetch,
  salesPerPage,
  isFetchingSalesSummary,
  salesSummary,
  fetchSalesSummary
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreSales,
    isFetchingSales,
    hasMoreSalesToFetch
  );

  useEffect(() => {
    fetchSales();
    fetchSalesSummary();
  }, [fetchSales, fetchSalesSummary]);

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
      <SalesList>
        {(sales || []).map((saleEntry, index) => (
          <SaleEntry
            saleInfo={saleEntry}
            key={index}
            intersectionCb={
              sales.length === index + 1 ? fetchMoreOnIntersection : undefined
            }
          />
        ))}
        {isFetchingSales && (
          <Skeleton height="250px" margin="0 0 30px" count={salesPerPage} />
        )}
      </SalesList>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  sales: selectSales,
  isFetchingSales: selectIsFetchingSales,
  hasMoreSalesToFetch: selectHasMoreSalesToFetch,
  salesPerPage: selectSalesPerPage,
  isFetchingSalesSummary: selectIsFetchingSalesSummary,
  salesSummary: selectSalesSummary
});

const mapDispatchToProps = (dispatch) => ({
  fetchSales: () => dispatch(startInitialSalesFetch()),
  fetchMoreSales: () => dispatch(startLoadingMoreSales()),
  fetchSalesSummary: () => dispatch(startSalesSummaryFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSales);
