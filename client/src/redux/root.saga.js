import { all, call } from "redux-saga/effects";
import productSagas from "./product/product.sagas";
import userSagas from "./user/user.sagas";
import cartSagas from "./cart/cart.sagas";
import productCategorySagas from "./product-category/product-category.sagas";
import checkoutSagas from "./checkout/checkout.sagas";
import wishListSagas from "./wish-list/wish-list.sagas";
import saleSagas from "./sale/sale.sagas";

function* rootSaga() {
  yield all([
    call(productSagas),
    call(userSagas),
    call(cartSagas),
    call(productCategorySagas),
    call(checkoutSagas),
    call(wishListSagas),
    call(saleSagas)
  ]);
}

export default rootSaga;
