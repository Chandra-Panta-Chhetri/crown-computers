import SALE_ACTION_TYPES from "./sale.action.types";
import { takeLatest, all, call, select, put } from "redux-saga/effects";
import { selectLastVisibleDoc, selectSalesPerPage } from "./sale.selectors";
import {
  initialSalesFetchFail,
  initialSalesFetchSuccess,
  loadingMoreSalesFail,
  loadingMoreSalesSuccess,
  noMoreToLoad,
  salesSummaryFetchFail,
  salesSummaryFetchSuccess
} from "./sale.actions";
import {
  getSales,
  getMoreSales,
  getSalesSummary
} from "../../firebase-utils/firebase.sale_utils";

function* fetchSales() {
  try {
    const salesPerPage = yield select(selectSalesPerPage);
    const { sales, lastVisibleDoc } = yield getSales(salesPerPage);
    if (!sales.length) {
      return yield put(noMoreToLoad());
    }
    yield put(initialSalesFetchSuccess(sales, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialSalesFetchFail(
        "There was a problem with getting the latest sales."
      )
    );
  }
}

function* fetchMoreSales() {
  try {
    const salesPerPage = yield select(selectSalesPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const { sales: newSales, lastVisibleDoc } = yield getMoreSales(
      lastDoc,
      salesPerPage
    );
    if (!newSales.length) {
      return yield put(noMoreToLoad());
    }
    yield put(loadingMoreSalesSuccess(newSales, lastVisibleDoc));
  } catch (err) {
    yield put(
      loadingMoreSalesFail("There was a problem with loading more sales.")
    );
  }
}

function* fetchSalesSummary() {
  try {
    const salesSummary = yield getSalesSummary();
    yield put(salesSummaryFetchSuccess(salesSummary));
  } catch (err) {
    yield put(
      salesSummaryFetchFail(
        "There was a problem displaying the summaries of the sales."
      )
    );
  }
}

function* watchSalesFetchStart() {
  yield takeLatest(SALE_ACTION_TYPES.START_INITIAL_SALES_FETCH, fetchSales);
}

function* watchLoadMoreSales() {
  yield takeLatest(SALE_ACTION_TYPES.START_LOADING_MORE_SALES, fetchMoreSales);
}

function* watchSalesSummaryFetchStart() {
  yield takeLatest(
    SALE_ACTION_TYPES.START_SALES_SUMMARY_FETCH,
    fetchSalesSummary
  );
}

export default function* saleSagas() {
  yield all([
    call(watchSalesFetchStart),
    call(watchLoadMoreSales),
    call(watchSalesSummaryFetchStart)
  ]);
}
