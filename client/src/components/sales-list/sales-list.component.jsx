import React, { useEffect } from "react";

import Skeleton from "../skeleton/skeleton.component";
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

const SalesList = ({
  sales,
  isFetchingSales,
  fetchSales,
  fetchMoreSales,
  hasMoreSalesToFetch,
  salesPerPage,
  className
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
    <section className={className}>
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
    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesList);
