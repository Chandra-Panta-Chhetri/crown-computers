import USER_ACTION_TYPES from "./user.action.types";

const persistedUser = JSON.parse(localStorage.getItem("user"));
const INITIAL_STATE = {
  currentUser: persistedUser,
  isChangingAuthState: false,
  loadingText: "",
  hasAutoSignedIn:
    JSON.parse(sessionStorage.getItem("hasAutoSignedIn")) || false
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.START_EMAIL_SIGN_IN:
    case USER_ACTION_TYPES.START_GOOGLE_SIGN_IN:
    case USER_ACTION_TYPES.START_SIGN_UP:
    case USER_ACTION_TYPES.START_LOG_OUT:
      return {
        ...prevState,
        isChangingAuthState: true,
        loadingText: action.payload.loadingText
      };
    case USER_ACTION_TYPES.START_AUTO_SIGN_IN:
      return {
        ...prevState,
        isChangingAuthState: !prevState.hasAutoSignedIn,
        loadingText: action.payload.loadingText
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload,
        isChangingAuthState: false
      };
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
    case USER_ACTION_TYPES.SIGN_UP_FAIL:
    case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
      return {
        ...prevState,
        currentUser: null,
        isChangingAuthState: false,
        hasAutoSignedIn: false
      };
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
      return {
        ...prevState,
        isChangingAuthState: false
      };
    default:
      return prevState;
  }
};

export default userReducer;
