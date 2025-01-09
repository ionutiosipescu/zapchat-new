import { create } from "zustand";
import { authService } from "@/firebase/auth/auth.service";
import {
  onAuthStateChangedListener,
  getUserDocument,
} from "../firebase/auth/auth.utils";

const initialState = {
  user: null,
  isAuthenticated: undefined,
  isLoading: false,
  error: null,
};

export const useAuthStore = create((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const result = await authService.login(email, password);
    set({ isLoading: false });

    if (!result.success) {
      set({ error: result.error });
    }

    return result;
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    const result = await authService.logout();

    if (!result.success) {
      set({ error: result.error });
    }

    set({ isLoading: false });
    return result;
  },

  register: async (email, password, username, profileUrl) => {
    set({ isLoading: true, error: null });
    const result = await authService.register(
      email,
      password,
      username,
      profileUrl
    );

    if (!result.success) {
      set({ error: result.error });
    }

    set({ isLoading: false });
    return result;
  },

  initializeAuthListener: () => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const currentUser = await getUserDocument(user);
        set({
          user: currentUser,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    });
    return unsubscribe;
  },
}));
