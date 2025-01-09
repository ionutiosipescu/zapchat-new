import React, { useEffect } from "react";
import "../global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../store";
import { MenuProvider } from "react-native-popup-menu";

// todo
// & this page we have the providers and protected routes
// * check if protected routes and redirect authenticated user to specific pages can be done better

const MainLayout = () => {
  const {
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    initializeAuthListener,
    user,
  } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // olde version - stable but I didn't like to have all of this here in this file
  // useEffect(() => {
  //   console.log("Setting up auth listener");

  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     console.log("Auth state changed:", user ? "User logged in" : "No user");

  //     if (user) {
  //       const currentUser = await getUserDocument(user);
  //       await setUser(currentUser);
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return unsubscribe;
  // }, []);

  // new version - less code
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isAuthenticated === undefined) return;
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
    // check if user is authenticated or not
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (!isAuthenticated) {
      // redirect to signIn
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <MainLayout />
    </MenuProvider>
  );
}
