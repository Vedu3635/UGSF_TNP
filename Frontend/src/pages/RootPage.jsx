import React, { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import LoadingPage from "../LoadingPage"; // Adjust path to your LoadingPage component

// Lazy-load Navbar only when needed
const Navbar = lazy(() => import("../components/Navbar"));

const RootPage = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/forgot-password"; // Add other paths if needed

  return (
    <>
      {!hideNavbar && (
        <Suspense>
          <Navbar />
        </Suspense>
      )}
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
