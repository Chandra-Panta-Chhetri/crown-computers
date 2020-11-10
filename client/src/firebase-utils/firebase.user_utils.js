import { auth } from "./firebase.config";
import {
  createNewDoc,
  getDocSnapshotById,
  setDocDataByRef,
  FIRESTORE_COLLECTION_REFS,
  USER_COLLECTION_NAME
} from "./firebase.abstract_utils";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewUser = async (userRef, newUserInfo) => {
  await setDocDataByRef(userRef, newUserInfo);
  await createNewDoc(FIRESTORE_COLLECTION_REFS.cartCollectionRef, {
    userRef,
    cartItems: [],
    isWishList: false
  });
};

export const getUserRefByAuth = async (userAuth, extraData) => {
  const { email, uid } = userAuth;
  const userSnapshot = await getDocSnapshotById(USER_COLLECTION_NAME, uid);
  const userRef = userSnapshot.ref;
  if (!userSnapshot.exists) {
    const newUser = {
      ...extraData,
      email,
      createdAt: new Date(),
      isAdmin: false
    };
    await createNewUser(userRef, newUser);
  }
  return userRef;
};
