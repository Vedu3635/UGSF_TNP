import React, { createContext, useState, useContext, useEffect } from "react";
import { isTokenExpired } from "../utils/tokenUtils.js"; // Import the function

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initial state: token exists and isn't expired
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    if ((token && !isTokenExpired(token)) == false) {
      localStorage.removeItem("token");
    }
    return token && !isTokenExpired(token); // Check token and expiration
  });

  const login = (token) => {
    localStorage.setItem("token", token); // Store the token in local storage
    setIsAuthenticated(true); // Update authentication state
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      setIsAuthenticated(false); // Token is invalid or expired
    } else {
      setIsAuthenticated(true); // Token is valid
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
