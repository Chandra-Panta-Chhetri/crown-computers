import { all, call } from "redux-saga/effects";

import productSagas from "./product/product.sagas";
import userSagas from "./user/user.sagas";
import cartSagas from "./cart/cart.sagas";
import directorySagas from "./directory/directory.sagas";
import checkoutSagas from "./checkout/checkout.sagas";

function* rootSaga() {
  yield all([
    call(productSagas),
    call(userSagas),
    call(cartSagas),
    call(directorySagas),
    call(checkoutSagas)
  ]);
}

export default rootSaga;
