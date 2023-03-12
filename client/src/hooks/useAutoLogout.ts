import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAuth } from "./useAuth";

export const useAutoLogout = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        }

        const timeout = setTimeout(
          logout,
          decodedToken.exp * 1000 - Date.now()
        );
        return () => clearTimeout(timeout);
      } catch (error) {
        logout();
      }
    }
  }, []);

  return null;
};
