import USER_ACTION_TYPES from "./user.action.types";

export const startAutoSignIn = () => ({
  type: USER_ACTION_TYPES.START_AUTO_SIGN_IN,
  payload: { loadingText: "Auto signing in" }
});

export const startGoogleSignIn = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
  payload: { loadingText: "Signing in and checking for saved cart" }
});

export const startEmailSignIn = ({ email, password }) => ({
  type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: {
    email,
    password,
    loadingText: "Signing in and checking for saved cart"
  }
});

export const signInSuccess = (user) => ({
  type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_IN_FAIL,
  payload: errorMsg
});

export const signUpStart = (newUserInfo) => ({
  type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: {
    newUserInfo,
    loadingText: "Creating new account and getting things ready"
  }
});

export const signUpFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_UP_FAIL,
  payload: errorMsg
});

export const logOutStart = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_START,
  payload: { loadingText: "Signing out and saving cart" }
});

export const logOutSuccess = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
});

export const logOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOG_OUT_FAIL,
  payload: errorMsg
});
