import React, { useEffect } from "react";

import Skeleton from "../skeleton/skeleton.component";
import Banner from "../banner/banner.component";

import { connect } from "react-redux";
import { startSalesSummaryFetch } from "../../redux/sale/sale.actions";
import {
  selectSalesSummary,
  selectIsFetchingSalesSummary
} from "../../redux/sale/sale.selectors";
import { isVariableDefined, roundNumber } from "../../global.utils";

const SalesSummary = ({
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
      {isFetchingSalesSummary ? (
        <Skeleton height="30px" margin="0 0 12px" count={3} />
      ) : (
        <>
          {isVariableDefined(totalNumSales) && (
            <Banner label="Total Sales" value={totalNumSales} />
          )}
          {isVariableDefined(salesTotal) && (
            <Banner
              label="Total Revenue"
              value={`$${roundNumber(salesTotal)}`}
            />
          )}
          {isVariableDefined(totalProductsSold) && (
            <Banner label="Total Products Sold" value={totalProductsSold} />
          )}
        </>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesSummary);
