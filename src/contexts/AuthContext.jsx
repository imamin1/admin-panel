import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./auth-context";
import {
  AUTH_UNAUTHORIZED_EVENT,
  getApiErrorMessage,
} from "../api";
import {
  clearAuthToken,
  fetchCurrentUser,
  getAuthToken,
  isInvalidSessionError,
  signIn,
  signOut,
} from "../services/auth.service";

const unauthenticatedState = {
  status: "unauthenticated",
  user: null,
  error: null,
};

const loadingState = {
  status: "loading",
  user: null,
  error: null,
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() =>
    getAuthToken() ? loadingState : unauthenticatedState
  );

  const handleUserLoadError = useCallback((error) => {
    if (isInvalidSessionError(error)) {
      clearAuthToken();
      setAuthState(unauthenticatedState);
    } else {
      setAuthState({
        status: "error",
        user: null,
        error: getApiErrorMessage(error),
      });
    }
  }, []);

  const refreshUser = useCallback(
    async () => {
      try {
        const user = await fetchCurrentUser();
        setAuthState({ status: "authenticated", user, error: null });
        return user;
      } catch (error) {
        handleUserLoadError(error);
        return null;
      }
    },
    [handleUserLoadError]
  );

  useEffect(() => {
    const handleUnauthorized = () => {
      setAuthState(unauthenticatedState);
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    if (getAuthToken()) {
      fetchCurrentUser()
        .then((user) => {
          setAuthState({ status: "authenticated", user, error: null });
        })
        .catch(handleUserLoadError);
    }

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [handleUserLoadError]);

  const login = useCallback(async (credentials) => {
    setAuthState(loadingState);

    try {
      await signIn(credentials);
      const user = await fetchCurrentUser();
      setAuthState({ status: "authenticated", user, error: null });
      return user;
    } catch (error) {
      if (isInvalidSessionError(error)) {
        clearAuthToken();
        setAuthState(unauthenticatedState);
      } else {
        setAuthState({
          status: getAuthToken() ? "error" : "unauthenticated",
          user: null,
          error: getApiErrorMessage(error, { context: "login" }),
        });
      }
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
    } finally {
      clearAuthToken();
      setAuthState(unauthenticatedState);
    }
  }, []);

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      refreshUser,
    }),
    [authState, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
