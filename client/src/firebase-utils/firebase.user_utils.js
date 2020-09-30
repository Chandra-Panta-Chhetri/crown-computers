import { firestore, auth } from "./firebase.config";
import { createNewCart } from "./firebase.cart_utils";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewUser = async (userRef, newUserInfo) => {
  await userRef.set(newUserInfo);
  await createNewCart(userRef);
};

export const createOrGetUser = async (userAuth, extraData) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    await createNewUser(userRef, {
      email: userAuth.email,
      createdAt: new Date(),
      isAdmin: false,
      ...extraData
    });
  }
  return userRef;
};

export const getUserRefById = (userId) => {
  const userRef = firestore.doc(`users/${userId}`);
  return userRef;
};
