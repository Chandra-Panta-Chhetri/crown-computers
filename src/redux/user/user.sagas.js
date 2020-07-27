import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.action.types";

import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  signOutSuccess,
  signOutFail,
  emailSignInStart
} from "./user.actions";
import { auth, googleProvider } from "../../utils/firebase.config";
import {
  createOrGetUser,
  getUserFromSession
} from "../../utils/firebase.utils";

function* signInWithGoogleSaga() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createOrGetUser, user, {
      fullName: user.fullName
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
    const userRef = yield call(createOrGetUser, user);
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
    const user = yield getUserFromSession();
    if (!user) throw Error("No user session found");
    const userRef = yield call(createOrGetUser, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
}

function* watchgetUserFromSessionSaga() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION,
    setUserFromSession
  );
}

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFail(e.message));
  }
}

function* watchSignOutSaga() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUser);
}

function* signUpUser({
  payload: { email, password, fullName, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrGetUser(user, { fullName });
    yield put(signUpSuccess());
    yield put(emailSignInStart({ email, password }));
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
    call(watchgetUserFromSessionSaga),
    call(watchSignOutSaga),
    call(watchSignUpSaga)
  ]);
}
