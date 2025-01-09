export const AUTH_ERROR_CODES = {
  "auth/invalid-email": "Invalid email address",
  "auth/invalid-credential": "Invalid credentials",
  "auth/email-already-in-use": "This email is already registered",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/user-not-found": "User not found",
  "auth/network-request-failed": "Network error. Please check your connection",
};

export const getAuthErrorMessage = (error) => {
  const errorCode = error?.code;
  return (
    AUTH_ERROR_CODES[errorCode] ||
    error?.message ||
    "An unexpected error occurred"
  );
};
