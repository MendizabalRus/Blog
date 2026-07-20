import { useState, useEffect, useContext, createContext } from "react";

import * as auth from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set the the user`s JWT in the storage.
  const login = async (credentials) => {
    console.log("authContext")
    setLoading(true);
    try {
      const result = await auth.login(credentials);

      localStorage.setItem("token", result.token);

      setUser(result.user);

      return result;
    } finally {
      setLoading(false);
    }
  };

  // Remove the user's JWT from storage
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Load user`s data
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const user = await auth.me();
      setUser(user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
