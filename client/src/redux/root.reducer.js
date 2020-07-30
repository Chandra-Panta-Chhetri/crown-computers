import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import collectionReducer from "./collection/collection.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  collection: collectionReducer
});
