import userReducer from "./users/user.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer
});
