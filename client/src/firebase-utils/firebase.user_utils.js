import { auth } from "./firebase.config";
import {
  createNewDoc,
  setDocDataByRef,
  FIRESTORE_COLLECTION_REFS,
  getDocRefById,
  getDocDataByRef,
  USER_COLLECTION_NAME
} from "./firebase.abstract_utils";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewUserFromAuth = async (userAuth, extraData) => {
  const { uid, email } = userAuth;
  const newUserInfo = {
    ...extraData,
    email,
    createdAt: new Date(),
    isAdmin: false
  };
  const newUserDocRef = getDocRefById(USER_COLLECTION_NAME, uid);
  await setDocDataByRef(newUserDocRef, newUserInfo);
  await createNewDoc(FIRESTORE_COLLECTION_REFS.cartCollectionRef, {
    userRef: newUserDocRef,
    cartItems: [],
    isWishList: false
  });
};

export const getUserById = async (userId) => {
  const userRef = getDocRefById(USER_COLLECTION_NAME, userId);
  const user = await getDocDataByRef(userRef, true, "userId");
  return user;
};
