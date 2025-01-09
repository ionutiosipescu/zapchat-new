import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { getAuthErrorMessage } from "./errors";

export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    try {
      await setDoc(userRef, {
        username: additionalData.username,
        profileUrl: additionalData.profileUrl,
        userId: user.uid,
        createdAt: new Date(),
        ...additionalData,
      });
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  }

  return userRef;
};

export const getUserDocument = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        ...user,
        username: userData.username,
        profileUrl: userData.profileUrl,
        userId: userData.userId,
      };
    }
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
