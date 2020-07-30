import USER_ACTION_TYPES from "./user.action.types";

export const signInUserFromSession = () => ({
  type: USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION
});

export const startGoogleSignIn = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const startEmailSignIn = ({ email, password }) => ({
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

export const signUpStart = ({
  email,
  password,
  fullName,
  confirmPassword
}) => ({
  type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: { email, password, fullName, confirmPassword }
});

export const signUpSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_UP_SUCCESS
});

export const signUpFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_UP_FAIL,
  payload: errorMsg
});

export const logOutStart = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_START
});

export const logOutSuccess = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
});

export const logOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOG_OUT_FAIL,
  payload: errorMsg
});

export const clearAuthError = () => ({
  type: USER_ACTION_TYPES.CLEAR_AUTH_ERRORS
});
