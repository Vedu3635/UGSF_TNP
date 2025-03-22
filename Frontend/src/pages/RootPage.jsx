import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootPage = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // Add other paths if needed

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
