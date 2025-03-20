import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoadingPage from "./LoadingPage";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingPage />; // Show loading while auth state is being determined
  }

  // Redirect to /login if not authenticated, replace history entry
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
