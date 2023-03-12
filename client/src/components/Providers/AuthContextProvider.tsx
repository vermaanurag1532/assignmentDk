import React, { useState } from "react";
import { AuthContext } from "contexts/auth";
import useLocalStorage from "hooks/useLocalStorage";

interface IProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  username: string;
  email: string;
}

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isLoggedIn = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
