import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // <-- Import useNavigate
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // <-- Define navigate

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-50 bg-white">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <BookOpenIcon className="w-7 h-7 text-blue-600" />
          <span>Portal</span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open
              ? "top-20 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              HOME
            </NavLink>
          </li>
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to="/service"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              SERVICE
            </NavLink>
          </li>
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to="/about"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              ABOUT
            </NavLink>
          </li>
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to="/contact"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              CONTACT
            </NavLink>
          </li>
          <button
            className="bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
