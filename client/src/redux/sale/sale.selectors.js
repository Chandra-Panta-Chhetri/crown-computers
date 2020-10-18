import { createSelector } from "reselect";

const selectSale = (state) => state.sale;

export const selectSales = createSelector([selectSale], (sale) => sale.sales);

export const selectIsFetchingSales = createSelector(
  [selectSale],
  (sale) => sale.isFetchingSales
);

export const selectSalesPerPage = createSelector(
  [selectSale],
  (sale) => sale.salesPerPage
);

export const selectLastVisibleDoc = createSelector(
  [selectSale],
  (sale) => sale.lastVisibleDoc
);

export const selectHasMoreSalesToFetch = createSelector(
  [selectSale],
  (sale) => sale.hasMoreToFetch
);
