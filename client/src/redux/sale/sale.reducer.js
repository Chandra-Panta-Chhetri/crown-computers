import SALE_ACTION_TYPES from "./sale.action.types";

const INITIAL_STATE = {
  sales: [],
  isFetchingSales: false,
  salesPerPage: 3,
  lastVisibleDoc: null,
  hasMoreToFetch: true
};

const saleReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SALE_ACTION_TYPES.INITIAL_SALES_FETCH_START:
    case SALE_ACTION_TYPES.LOAD_MORE_SALES_START:
      return {
        ...prevState,
        isFetchingSales: true
      };
    case SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL:
    case SALE_ACTION_TYPES.LOAD_MORE_SALES_FAIL:
      return {
        ...prevState,
        isFetchingSales: false
      };
    case SALE_ACTION_TYPES.INITIAL_SALES_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingSales: false
      };
    case SALE_ACTION_TYPES.LOAD_MORE_SALES_SUCCESS:
      return {
        ...prevState,
        isFetchingSales: false,
        sales: [...prevState.sales, ...action.payload.newSales],
        lastVisibleDoc: action.payload.lastVisibleDoc
      };
    case SALE_ACTION_TYPES.NO_MORE_TO_LOAD:
      return {
        ...prevState,
        hasMoreToFetch: false,
        isFetchingSales: false
      };
    default:
      return prevState;
  }
};

export default saleReducer;
