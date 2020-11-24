import USER_ACTION_TYPES from "./user.action.types";

export const startAutoSignIn = () => ({
  type: USER_ACTION_TYPES.START_AUTO_SIGN_IN,
  payload: { loadingText: "Auto signing in" }
});

export const startGoogleSignIn = () => ({
  type: USER_ACTION_TYPES.START_GOOGLE_SIGN_IN,
  payload: { loadingText: "Signing in" }
});

export const startEmailSignIn = ({ email, password }) => ({
  type: USER_ACTION_TYPES.START_EMAIL_SIGN_IN,
  payload: {
    email,
    password,
    loadingText: "Signing in"
  }
});

export const signInSuccess = (user) => ({
  type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_IN_FAIL,
  payload: { errorTitle: "Sign In Failed", errorMsg }
});

export const startSignUp = (newUserInfo) => ({
  type: USER_ACTION_TYPES.START_SIGN_UP,
  payload: {
    newUserInfo,
    loadingText: "Creating new account and getting things ready"
  }
});

export const signUpFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_UP_FAIL,
  payload: { errorTitle: "Sign Up Failed", errorMsg }
});

export const startLogOut = () => ({
  type: USER_ACTION_TYPES.START_LOG_OUT,
  payload: { loadingText: "Signing out" }
});

export const logOutSuccess = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
});

export const logOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOG_OUT_FAIL,
  payload: { errorTitle: "Log Out Failed", errorMsg }
});
