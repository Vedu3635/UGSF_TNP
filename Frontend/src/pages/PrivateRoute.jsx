import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  return isAuthenticated ? children : <Navigate to="/login1" />;
};

export default PrivateRoute;
