import USER_ACTION_TYPES from "./user.action.types";

export const googleSignInStart = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = ({ email, password }) => ({
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

export const getUserFromSession = () => ({
  type: USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION
});

export const logOutStart = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
});

export const signOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_OUT_FAIL,
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
