import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Navbar = ({ userProfile }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Default profile image in case no image is provided
  const defaultProfileImage = "https://i.pravatar.cc/150?u=default";

  // Navigation items with icons
  const navItems = [
    {
      name: "TNP",
      path: "/",
      icon: <HomeIcon className="w-5 h-5 mr-2" />,
    },
    {
      name: "EVENTS",
      path: "/events",
      icon: <CalendarIcon className="w-5 h-5 mr-2" />,
    },
    {
      name: "QUIZ",
      path: "/quiz",
      icon: <AcademicCapIcon className="w-5 h-5 mr-2" />,
    },
    {
      name: "RESEARCH",
      path: "/research",
      icon: <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-2" />,
    },
    {
      name: "Alumni",
      path: "/alumni",
      icon: <UsersIcon className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg w-full sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <UserCircleIcon className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-800">CareerVista</span>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {/* Navigation Links */}
            <ul className="flex space-x-1 lg:space-x-4 items-center">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
            flex items-center 
            px-2 py-2 lg:px-3 
            rounded-lg 
            transition-all duration-300 
            relative text-sm lg:text-base
            ${
              isActive
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-blue-800 hover:bg-blue-200"
            }
          `}
                  >
                    {item.icon}
                    {item.name}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Separate Profile Section */}
          <div className="hidden md:flex">
            <div
              className="
      w-10 h-10 lg:w-12 lg:h-12
      rounded-full 
      border-2 border-blue-500 
      overflow-hidden 
      cursor-pointer 
      hover:shadow-lg 
      transition-all 
      transform hover:scale-110
      ml-2
    "
              onClick={() => navigate("/profile")}
            >
              <img
                src={userProfile?.profileImage || defaultProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            {/* Mobile Profile Icon */}
            <div
              className="
                w-8 h-8
                rounded-full 
                border-2 border-blue-500 
                overflow-hidden 
                cursor-pointer 
                mr-4
              "
              onClick={() => navigate("/profile")}
            >
              <img
                src={userProfile?.profileImage || defaultProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-blue-600 focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
            md:hidden
            ${open ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"} 
            overflow-hidden
            transition-all duration-300 ease-in-out
          `}
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center 
                    px-3 py-2 
                    rounded-lg 
                    transition-all duration-300 
                    relative
                    ${
                      isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-blue-800 hover:bg-blue-200"
                    }
                  `}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.name}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
