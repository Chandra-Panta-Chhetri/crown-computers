import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import productReducer from "./product/product.reducer";
import notificationReducer from "./notification/notification.reducer";
import checkoutReducer from "./checkout/checkout.reducer";
import wishlistReducer from "./wishlist/wishlist.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  product: productReducer,
  notification: notificationReducer,
  checkout: checkoutReducer,
  wishlist: wishlistReducer
});
