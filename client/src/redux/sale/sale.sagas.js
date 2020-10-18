import SALE_ACTION_TYPES from "./sale.action.types";
import { takeLatest, all, call, select, put } from "redux-saga/effects";
import { selectLastVisibleDoc, selectSalesPerPage } from "./sale.selectors";
import {
  initialSalesFetchFail,
  initialSalesFetchSuccess,
  loadingMoreSalesFail,
  loadingMoreSalesSuccess,
  noMoreToLoad
} from "./sale.actions";
import {
  getSales,
  getMoreSales
} from "../../firebase-utils/firebase.sale_utils";
import { addErrorNotification } from "../notification/notification.actions";

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
        "There was a problem with getting the latest sales. Please try again later"
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
      loadingMoreSalesFail(
        "There was a problem with loading more sales. Please try again later"
      )
    );
  }
}

function* handleSalesFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Sales Fetching Failed", errorMsg));
}

function* watchSalesFetchStart() {
  yield takeLatest(SALE_ACTION_TYPES.INITIAL_SALES_FETCH_START, fetchSales);
}

function* watchSalesFetchFail() {
  yield takeLatest(
    [
      SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL,
      SALE_ACTION_TYPES.LOAD_MORE_SALES_FAIL
    ],
    handleSalesFetchFail
  );
}

function* watchLoadMoreSales() {
  yield takeLatest(SALE_ACTION_TYPES.LOAD_MORE_SALES_START, fetchMoreSales);
}

export default function* saleSagas() {
  yield all([
    call(watchSalesFetchStart),
    call(watchSalesFetchFail),
    call(watchLoadMoreSales)
  ]);
}
