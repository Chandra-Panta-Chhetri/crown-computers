import USER_ACTIONS from "./user.action.types";
const INITIALSTATE = {
  currentUser: null
};

const userReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return {
        ...prevState,
        currentUser: action.payload
      };
    default:
      return prevState;
  }
};

export default userReducer;
