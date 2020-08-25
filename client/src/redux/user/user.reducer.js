import USER_ACTION_TYPES from "./user.action.types";

const INITIAL_STATE = {
  currentUser: null,
  isChangingAuthState: false,
  loadingText: ""
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPES.SIGN_UP_START:
      return {
        ...prevState,
        isChangingAuthState: true,
        loadingText: "Signing in and checking for saved cart"
      };
    case USER_ACTION_TYPES.LOG_OUT_START:
      return {
        ...prevState,
        isChangingAuthState: true,
        loadingText: "Logging out and saving cart"
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload,
        isChangingAuthState: false
      };
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
    case USER_ACTION_TYPES.SIGN_UP_FAIL:
      return {
        ...prevState,
        isChangingAuthState: false
      };
    case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
      return {
        ...prevState,
        currentUser: null,
        isChangingAuthState: false
      };
    default:
      return prevState;
  }
};

export default userReducer;
