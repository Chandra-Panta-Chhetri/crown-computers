import USER_ACTION_TYPES from "./user.action.types";
const INITIALSTATE = { currentUser: null };

const userReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...prevState,
        currentUser: action.payload
      };
    default:
      return prevState;
  }
};

export default userReducer;
