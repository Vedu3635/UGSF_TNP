import React, { createContext, useState, useContext, useEffect } from "react";
import { isTokenExpired } from "../utils/tokenUtils.js"; // Ensure this is implemented

// Create the context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize isAuthenticated based on token validity
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false
  const [loading, setLoading] = useState(true); // Add loading state, default to true

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Immediately set to false
    setLoading(false); // Ensure loading is false after logout
  };
  // Check token validity on mount and periodically
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token"); // Clean up expired token
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true); // Confirm token is still valid
      }
      setLoading(false); // Set loading to false once check is complete
    };

    // Run immediately on mount
    checkToken();

    // Set up periodic check
    const intervalId = setInterval(checkToken, 60000); // Store interval ID

    // Cleanup interval on unmount
    return () => clearInterval(intervalId); // Use the stored interval ID
  }, []); // Empty dependency array to run only on mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
