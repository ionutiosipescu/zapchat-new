import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBam54AnWioxVXk2h4kZUePiKWleg1LGTs",
  authDomain: "zapchat-39dc3.firebaseapp.com",
  projectId: "zapchat-39dc3",
  storageBucket: "zapchat-39dc3.firebasestorage.app",
  messagingSenderId: "878460053493",
  appId: "1:878460053493:web:39bf5c4af539faa755e2bc",
};

const app = initializeApp(firebaseConfig);

export const auth = Platform.select({
  native: () =>
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    }),
  web: () => getAuth(app),
  default: () => getAuth(app),
})();

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
