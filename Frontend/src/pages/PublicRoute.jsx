import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoadingPage from "./LoadingPage";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingPage />; // Show loading while auth state is being determined
  }

  // Redirect to / if authenticated, otherwise render children
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
