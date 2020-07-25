import USER_ACTION_TYPES from "./user.action.types";
const INITIALSTATE = {
  currentUser: null,
  authErrorMsg: null,
  isLoggingIn: false
};

const userReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
      return {
        ...prevState,
        isLoggingIn: true
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload,
        isLoggingIn: false
      };
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
      return {
        ...prevState,
        isLoggingIn: false,
        authErrorMsg: action.payload
      };
    default:
      return prevState;
  }
};

export default userReducer;
