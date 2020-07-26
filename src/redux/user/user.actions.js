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

export const loginUserFromSession = () => ({
  type: USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION
});

export const signOutStart = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
});

export const signOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_OUT_FAIL,
  payload: errorMsg
});
