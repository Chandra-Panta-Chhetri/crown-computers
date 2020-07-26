import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.action.types";

import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  signOutSuccess,
  signOutFail,
  emailSignInStarted
} from "./user.actions";
import { clearCart } from "../cart/cart.actions";
import { auth, googleProvider } from "../../utils/firebaseConfig";
import { addUserToDb, loginUserFromSession } from "../../utils/firebaseUtils";

function* signInWithGoogleSaga() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(addUserToDb, user, {
      displayName: user.displayName
    });
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
}

function* watchGoogleSignInSaga() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signInWithGoogleSaga
  );
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(addUserToDb, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
}

function* watchEmailSignInSaga() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* setUserFromSession() {
  try {
    const user = yield loginUserFromSession();
    if (!user) throw Error("No user session found");
    const userRef = yield call(addUserToDb, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
}

function* watchloginUserFromSessionSaga() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION,
    setUserFromSession
  );
}

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(clearCart());
  } catch (e) {
    yield put(signOutFail(e.message));
  }
}

function* watchSignOutSaga() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUser);
}

function* signUpUser({
  payload: { email, password, displayName, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield addUserToDb(user, { displayName });
    yield put(signUpSuccess());
    yield put(emailSignInStarted({ email, password }));
  } catch (e) {
    yield put(signUpFail(e.message));
  }
}

function* watchSignUpSaga() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export default function* userSaga() {
  yield all([
    call(watchGoogleSignInSaga),
    call(watchEmailSignInSaga),
    call(watchloginUserFromSessionSaga),
    call(watchSignOutSaga),
    call(watchSignUpSaga)
  ]);
}
