import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { createUserDocument } from "./auth.utils";
import { getAuthErrorMessage } from "./errors";

class AuthService {
  async login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  }

  async logout() {
    try {
      await signOut(auth);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  }

  async register(email, password, username, profileUrl) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocument(userCredential.user, { username, profileUrl });

      return {
        success: true,
        error: null,
        user: userCredential?.user,
      };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  }
}

export const authService = new AuthService();
