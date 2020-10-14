import USER_ACTION_TYPES from "./user.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  signInSuccess,
  signInFail,
  signUpFail,
  logOutSuccess,
  logOutFail,
  startEmailSignIn
} from "./user.actions";
import { restoreCart, clearCart } from "../cart/cart.actions";
import { auth, googleProvider } from "../../firebase-utils/firebase.config";
import {
  createOrGetUser,
  getUserFromSession
} from "../../firebase-utils/firebase.user_utils";
import { getUserCartAndCartId } from "../../firebase-utils/firebase.cart_utils";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { capitalize } from "../../global.utils";

function* setUserFromSnapShot(userAuth, additionalData) {
  const userRef = yield createOrGetUser(userAuth, additionalData);
  const userSnapshot = yield userRef.get();
  const { cart, cartId } = yield getUserCartAndCartId(userRef);
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  yield put(restoreCart(cart, cartId));
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(setUserFromSnapShot, user, {
      fullName: user.displayName
    });
  } catch (err) {
    yield put(signInFail("Google sign in failed"));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(setUserFromSnapShot, user);
  } catch (err) {
    console.log(err);
    yield put(signInFail("Email or password incorrect"));
  }
}

function* autoSignIn() {
  try {
    const user = yield getUserFromSession();
    if (!user) {
      throw Error();
    }
    yield call(setUserFromSnapShot, user);
  } catch (err) {
    yield put(signInFail("Auto sign in failed, please login again"));
    yield put(clearCart());
  }
}

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(logOutSuccess());
  } catch (err) {
    yield put(logOutFail("Signing out failed, please try again"));
  }
}

function* signUpUser({
  payload: {
    newUserInfo: { email, password, fullName, confirmPassword }
  }
}) {
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrGetUser(user, { fullName });
    yield put(startEmailSignIn({ email, password }));
  } catch (err) {
    yield put(signUpFail(err.message));
  }
}

function* handleSignInFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Sign In Failed", errorMsg));
}

function* handleSignInSuccess({ payload: loggedInUser }) {
  yield put(
    addSuccessNotification(
      "Sign In Successful",
      `Welcome back ${capitalize(
        loggedInUser.fullName
      )}! Your cart has been restored`
    )
  );
}

function* handleSignUpFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Sign Up Failed", errorMsg));
}

function* handleLogOutFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Log Out Failed", errorMsg));
}

function* watchSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

function* watchSignUpFail() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_FAIL, handleSignUpFail);
}

function* watchGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* watchEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* watchGetUserFromSession() {
  yield takeLatest(USER_ACTION_TYPES.START_AUTO_SIGN_IN, autoSignIn);
}

function* watchSignInSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, handleSignInSuccess);
}

function* watchSignInFail() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_FAIL, handleSignInFail);
}

function* watchLogOutStart() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_START, signOutUser);
}

function* watchLogOutFail() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_FAIL, handleLogOutFail);
}

export default function* userSagas() {
  yield all([
    call(watchSignUpStart),
    call(watchSignUpFail),
    call(watchGoogleSignIn),
    call(watchEmailSignIn),
    call(watchGetUserFromSession),
    call(watchSignInFail),
    call(watchSignInSuccess),
    call(watchLogOutStart),
    call(watchLogOutFail)
  ]);
}
