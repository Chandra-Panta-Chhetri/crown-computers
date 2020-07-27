import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.action.types";
import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  logOutSuccess,
  logOutFail,
  startEmailSignIn
} from "./user.actions";
import { auth, googleProvider } from "../../utils/firebase.config";
import {
  createOrGetUser,
  getUserFromSession
} from "../../utils/firebase.utils";

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createOrGetUser, user, {
      fullName: user.displayName
    });
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
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

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(logOutSuccess());
  } catch (e) {
    yield put(logOutFail(e.message));
  }
}

function* signUpUser({
  payload: { email, password, fullName, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrGetUser(user, { fullName });
    yield put(signUpSuccess());
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
    USER_ACTION_TYPES.SIGN_IN_USER_FROM_SESSION,
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
