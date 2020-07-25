import USER_ACTION_TYPES from "./user.action.types";

export const googleSignInStarted = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const emailSignInStarted = (email, password) => ({
  type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: { email, password }
});

export const signInSuccess = (user) => ({
  type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_IN_FAIL,
  payload: errorMsg
});
