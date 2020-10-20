import SALE_ACTION_TYPES from "./sale.action.types";

export const startInitialSalesFetch = () => ({
  type: SALE_ACTION_TYPES.INITIAL_SALES_FETCH_START
});

export const initialSalesFetchFail = (errorMsg) => ({
  type: SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL,
  payload: errorMsg
});

export const initialSalesFetchSuccess = (sales, lastVisibleDoc) => ({
  type: SALE_ACTION_TYPES.INITIAL_SALES_FETCH_SUCCESS,
  payload: { sales, lastVisibleDoc }
});

export const startLoadingMoreSales = () => ({
  type: SALE_ACTION_TYPES.LOAD_MORE_SALES_START
});

export const loadingMoreSalesFail = (errorMsg) => ({
  type: SALE_ACTION_TYPES.LOAD_MORE_SALES_FAIL,
  payload: errorMsg
});

export const loadingMoreSalesSuccess = (newSales, lastVisibleDoc) => ({
  type: SALE_ACTION_TYPES.LOAD_MORE_SALES_SUCCESS,
  payload: { newSales, lastVisibleDoc }
});

export const noMoreToLoad = () => ({
  type: SALE_ACTION_TYPES.NO_MORE_TO_LOAD
});

export const startSalesSummaryFetch = () => ({
  type: SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_START
});

export const salesSummaryFetchFail = (errorMsg) => ({
  type: SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_FAIL,
  payload: errorMsg
});

export const salesSummaryFetchSuccess = (salesSummary) => ({
  type: SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_SUCCESS,
  payload: salesSummary
});
