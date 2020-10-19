import React, { useEffect } from "react";
import { SalesList, Subtitle } from "./dashboard-sales.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import SaleEntry from "../sale-entry/sale-entry.component";

import { connect } from "react-redux";
import {
  startInitialSalesFetch,
  startLoadingMoreSales
} from "../../redux/sale/sale.actions";
import {
  selectIsFetchingSales,
  selectSales,
  selectHasMoreSalesToFetch,
  selectSalesPerPage
} from "../../redux/sale/sale.selectors";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { createStructuredSelector } from "reselect";

const DashboardSales = ({
  sales,
  isFetchingSales,
  totalItemsSold = 100,
  totalProfit = 1000,
  fetchSales,
  fetchMoreSales,
  hasMoreSalesToFetch,
  salesPerPage
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreSales,
    isFetchingSales,
    hasMoreSalesToFetch
  );

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
    <>
      <DashboardContentTitle>Sales</DashboardContentTitle>
      <Subtitle>Total Profit: ${totalProfit}</Subtitle>
      <Subtitle>Total Items Sold: {totalItemsSold}</Subtitle>
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
      </SalesList>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  sales: selectSales,
  isFetchingSales: selectIsFetchingSales,
  hasMoreSalesToFetch: selectHasMoreSalesToFetch,
  salesPerPage: selectSalesPerPage
});

const mapDispatchToProps = (dispatch) => ({
  fetchSales: () => dispatch(startInitialSalesFetch()),
  fetchMoreSales: () => dispatch(startLoadingMoreSales())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSales);
