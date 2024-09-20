import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootPage = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
