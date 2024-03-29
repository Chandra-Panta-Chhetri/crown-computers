import SALE_ACTION_TYPES from "./sale.action.types";

const INITIAL_STATE = {
  sales: [],
  isFetchingSales: false,
  salesPerPage: 3,
  lastVisibleDoc: null,
  hasMoreToFetch: true,
  isFetchingSalesSummary: false,
  salesSummary: {}
};

const saleReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SALE_ACTION_TYPES.START_INITIAL_SALES_FETCH:
      return {
        ...prevState,
        isFetchingSales: true,
        hasMoreToFetch: true,
        lastVisibleDoc: null,
        sales: []
      };
    case SALE_ACTION_TYPES.START_LOADING_MORE_SALES:
      return {
        ...prevState,
        isFetchingSales: true
      };
    case SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL:
    case SALE_ACTION_TYPES.LOADING_MORE_SALES_FAIL:
    case SALE_ACTION_TYPES.NO_MORE_SALES_TO_LOAD:
      return {
        ...prevState,
        isFetchingSales: false,
        hasMoreToFetch: false
      };
    case SALE_ACTION_TYPES.INITIAL_SALES_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingSales: false
      };
    case SALE_ACTION_TYPES.LOADING_MORE_SALES_SUCCESS:
      return {
        ...prevState,
        isFetchingSales: false,
        sales: [...prevState.sales, ...action.payload.newSales],
        lastVisibleDoc: action.payload.lastVisibleDoc
      };
    case SALE_ACTION_TYPES.START_SALES_SUMMARY_FETCH:
      return {
        ...prevState,
        isFetchingSalesSummary: true
      };
    case SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingSalesSummary: false
      };
    case SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        isFetchingSalesSummary: false,
        salesSummary: action.payload
      };
    default:
      return prevState;
  }
};

export default saleReducer;
