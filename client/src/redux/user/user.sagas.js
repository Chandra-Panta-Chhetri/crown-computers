import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.action.types";
import {
  signInSuccess,
  signInFail,
  signUpFail,
  logOutSuccess,
  logOutFail,
  startEmailSignIn
} from "./user.actions";
import { restoreCart } from "../cart/cart.actions";
import { auth, googleProvider } from "../../utils/firebase.config";
import {
  createOrGetUser,
  getUserFromSession
} from "../../utils/firebase.user_utils";
import { getUserCartAndCartId } from "../../utils/firebase.cart_utils";

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
  } catch (e) {
    yield put(signInFail("Google sign in failed"));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(setUserFromSnapShot, user);
  } catch (e) {
    yield put(signInFail("Email or password incorrect"));
  }
}

function* setUserFromSession() {
  try {
    const user = yield getUserFromSession();
    if (user) {
      yield call(setUserFromSnapShot, user);
    }
  } catch (e) {
    yield put(signInFail("Auto sign in failed, please try again"));
  }
}

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(logOutSuccess());
  } catch (e) {
    yield put(logOutFail("Signing out failed, please try again"));
  }
}

function* signUpUser({
  payload: { email, password, fullName, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrGetUser(user, { fullName });
    yield put(startEmailSignIn({ email, password }));
  } catch (e) {
    yield put(signUpFail(e.message));
  }
}

function* watchGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* watchEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* watchSignOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_START, signOutUser);
}

function* watchgetUserFromSession() {
  yield takeLatest(
    USER_ACTION_TYPES.START_SIGN_IN_USER_FROM_SESSION,
    setUserFromSession
  );
}

function* watchSignUp() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export default function* userSagas() {
  yield all([
    call(watchGoogleSignIn),
    call(watchEmailSignIn),
    call(watchgetUserFromSession),
    call(watchSignOut),
    call(watchSignUp)
  ]);
}
