import { createContext } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContext {
  user?: User | null;
  token: string | null;
  isLoggedIn: () => boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  user: undefined,
  token: "",
  isLoggedIn: () => false,
  login: (user: User, token: string) => {},
  logout: () => {},
});
