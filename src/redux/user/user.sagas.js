import { takeLatest, put, call } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.action.types";

import { signInSuccess, signInFail } from "./user.actions";
import { auth, googleProvider } from "../../utils/firebaseConfig";
import { addUserToDb } from "../../utils/firebaseUtils";

function* signInWithGoogleSaga() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(addUserToDb, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signInFail(e.message));
  }
}

export function* watchGoogleSignInSaga() {
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

export function* watchEmailSignInSaga() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
