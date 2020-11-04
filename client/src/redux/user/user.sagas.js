import USER_ACTION_TYPES from "./user.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
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
import { addSuccessNotification } from "../notification/notification.actions";
import { capitalize } from "../../global.utils";
import { selectHasAutoSignedIn } from "./user.selectors";

function* setUserFromSnapShot(userAuth, additionalData) {
  const userRef = yield createOrGetUser(userAuth, additionalData);
  const userSnapshot = yield userRef.get();
  const userData = yield userSnapshot.data();
  yield put(signInSuccess({ id: userSnapshot.id, ...userData }));
  if (!userData.isAdmin) {
    const { cart, cartId } = yield getUserCartAndCartId(userRef);
    yield put(restoreCart(cart, cartId));
  }
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

function* signUpUser({ payload: { newUserInfo } }) {
  try {
    const { email, password, fullName, confirmPassword } = yield newUserInfo;
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrGetUser(user, { fullName });
    yield put(startEmailSignIn({ email, password }));
  } catch (err) {
    yield put(signUpFail(err.message));
  }
}

function* handleSignInSuccess({ payload: loggedInUser }) {
  const hasAutoLoggedIn = yield select(selectHasAutoSignedIn);
  if (!hasAutoLoggedIn) {
    yield put(
      addSuccessNotification(
        "Sign In Successful",
        `Welcome back ${capitalize(loggedInUser.fullName)}!${
          loggedInUser.isAdmin ? "" : " Your cart has been restored."
        }`
      )
    );
    yield sessionStorage.setItem("hasAutoSignedIn", true);
  }
  yield localStorage.setItem("user", JSON.stringify(loggedInUser));
}

function* handleLogOutSuccess() {
  yield put(clearCart());
  yield localStorage.removeItem("user");
  yield sessionStorage.removeItem("hasAutoSignedIn");
  yield put(addSuccessNotification("Log Out Successful", "See you next time!"));
}

function* watchGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.START_GOOGLE_SIGN_IN, signInWithGoogle);
}

function* watchEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.START_EMAIL_SIGN_IN, signInWithEmail);
}

function* watchGetUserFromSession() {
  yield takeLatest(USER_ACTION_TYPES.START_AUTO_SIGN_IN, autoSignIn);
}

function* watchSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.START_SIGN_UP, signUpUser);
}

function* watchSignInSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, handleSignInSuccess);
}

function* watchStartLogOut() {
  yield takeLatest(USER_ACTION_TYPES.START_LOG_OUT, signOutUser);
}

function* watchLogOutSuccess() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, handleLogOutSuccess);
}

export default function* userSagas() {
  yield all([
    call(watchSignUpStart),
    call(watchGoogleSignIn),
    call(watchEmailSignIn),
    call(watchGetUserFromSession),
    call(watchSignInSuccess),
    call(watchStartLogOut),
    call(watchLogOutSuccess)
  ]);
}
