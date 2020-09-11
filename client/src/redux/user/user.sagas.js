import USER_ACTION_TYPES from "./user.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  signInSuccess,
  signInFail,
  signUpFail,
  logOutSuccess,
  logOutFail,
  startEmailSignIn,
  startAutoSignIn
} from "./user.actions";
import { restoreCart, clearCart } from "../cart/cart.actions";
import { auth, googleProvider } from "../../firebase-utils/firebase.config";
import {
  createOrGetUser,
  getUserFromSession
} from "../../firebase-utils/firebase.user_utils";
import { getUserCartAndCartId } from "../../firebase-utils/firebase.cart_utils";
import { selectWasSignedIn } from "./user.selectors";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";

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
    yield put(signInFail("Email or password incorrect"));
  }
}

function* setUserFromSession() {
  try {
    const user = yield getUserFromSession();
    const wasSignedIn = yield select(selectWasSignedIn);
    if (!user && wasSignedIn) {
      throw Error();
    } else if (user && wasSignedIn) {
      yield put(startAutoSignIn());
      yield call(setUserFromSnapShot, user);
    }
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
      `Welcome back ${loggedInUser.fullName.toUpperCase()}! Your cart has been restored`
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

function* watchgetUserFromSession() {
  yield takeLatest(
    USER_ACTION_TYPES.START_SIGN_IN_USER_FROM_SESSION,
    setUserFromSession
  );
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
    call(watchgetUserFromSession),
    call(watchSignInFail),
    call(watchSignInSuccess),
    call(watchLogOutStart),
    call(watchLogOutFail)
  ]);
}
