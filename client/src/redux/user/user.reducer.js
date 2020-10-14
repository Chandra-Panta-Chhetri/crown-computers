import USER_ACTION_TYPES from "./user.action.types";

const INITIAL_STATE = {
  currentUser: null,
  isChangingAuthState: false,
  loadingText: "",
  wasSignedIn: localStorage.getItem("wasSignedIn") === "true"
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPES.SIGN_UP_START:
    case USER_ACTION_TYPES.LOG_OUT_START:
    case USER_ACTION_TYPES.START_AUTO_SIGN_IN:
      return {
        ...prevState,
        isChangingAuthState: true,
        loadingText: action.payload.loadingText
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      localStorage.setItem("wasSignedIn", true);
      return {
        ...prevState,
        currentUser: action.payload,
        isChangingAuthState: false,
        wasSignedIn: true
      };
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
    case USER_ACTION_TYPES.SIGN_UP_FAIL:
      localStorage.setItem("wasSignedIn", false);
      return {
        ...prevState,
        isChangingAuthState: false,
        wasSignedIn: false
      };
    case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
      localStorage.setItem("wasSignedIn", false);
      return {
        ...prevState,
        currentUser: null,
        isChangingAuthState: false,
        wasSignedIn: false
      };
    default:
      return prevState;
  }
};

export default userReducer;
