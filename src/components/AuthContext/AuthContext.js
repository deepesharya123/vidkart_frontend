import { createContext } from "react";

const AuthContext = createContext({
  authSeller: null,
  isLoading: false,
  user: null,
  setUser: () => {},
  error: false,
  loginSeller: async () => {},
  logoutSeller: async () => {},
  isSellerAuthenticated: false,
});

export default AuthContext;
