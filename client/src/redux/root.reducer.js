import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import productCategoryReducer from "./product-category/product-category.reducer";
import productReducer from "./product/product.reducer";
import notificationReducer from "./notification/notification.reducer";
import checkoutReducer from "./checkout/checkout.reducer";
import wishListReducer from "./wish-list/wish-list.reducer";
import saleReducer from "./sale/sale.reducer";
import themeReducer from "./theme/theme.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  productCategory: productCategoryReducer,
  product: productReducer,
  notification: notificationReducer,
  checkout: checkoutReducer,
  wishList: wishListReducer,
  sale: saleReducer,
  theme: themeReducer
});
