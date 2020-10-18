import React, { useEffect } from "react";
import { DashboardSalesContainer, Sales } from "./dashboard-sales.styles";

import SaleEntry from "../sale-entry/sale-entry.component";

import { connect } from "react-redux";
import {
  startInitialSalesFetch,
  startLoadingMoreSales
} from "../../redux/sale/sale.actions";
import {
  selectIsFetchingSales,
  selectSales,
  selectHasMoreSalesToFetch
} from "../../redux/sale/sale.selectors";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";

const DashboardSales = ({
  sales,
  isFetchingSales,
  totalItemsSold = 100,
  totalProfit = 1000,
  fetchSales,
  fetchMoreSales,
  hasMoreSalesToFetch
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
    <DashboardSalesContainer>
      <h3>Sales</h3>
      <span>Total Items Sold: {totalItemsSold}</span>
      <span>Total Profit: ${totalProfit}</span>
      <Sales>
        {(sales || []).map((saleEntry, index) => (
          <SaleEntry
            saleInfo={saleEntry}
            key={index}
            intersectionCb={
              sales.length === index + 1 ? fetchMoreOnIntersection : undefined
            }
          />
        ))}
      </Sales>
    </DashboardSalesContainer>
  );
};

const mapStateToProps = (state) => ({
  sales: selectSales(state),
  isFetchingSales: selectIsFetchingSales(state),
  hasMoreSalesToFetch: selectHasMoreSalesToFetch(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSales: () => dispatch(startInitialSalesFetch()),
  fetchMoreSales: () => dispatch(startLoadingMoreSales())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSales);
