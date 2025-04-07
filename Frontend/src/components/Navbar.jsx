import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext"; // Import useAuth

import {
  Home,
  Calendar,
  Bird,
  GraduationCap,
  FileSearch,
  User,
  Users,
  X,
  Menu,
  LogOut,
} from "lucide-react";

const Navbar = ({ userProfile }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Default profile image in case no image is provided
  const defaultProfileImage = "https://i.pravatar.cc/150?u=default";

  // Navigation items with icons
  const navItems = [
    {
      name: "CareerMarg",
      path: "/",
      icon: <Home className="w-5 h-5 mr-2" />,
    },
    {
      name: "Pankh",
      path: "http://172.16.11.55:3005/",
      icon: <Bird className="w-5 h-5 mr-2" />,
    },
    {
      name: "PlaceStar",
      path: "http://172.16.11.55:5173/",
      icon: <GraduationCap className="w-5 h-5 mr-2" />,
    },
    {
      name: "RESEARCH",
      path: "/research",
      icon: <FileSearch className="w-5 h-5 mr-2" />,
    },
    {
      name: "Alumni",
      path: "/alumni",
      icon: <User className="w-5 h-5 mr-2" />,
    },
  ];

  // Logout handler
  const handleLogout = () => {
    logout(); // Use AuthContext logout
    navigate("/login", { replace: true }); // Navigate to login
    setProfileOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg w-full sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Users className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-800">CareerMarg</span>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {/* Navigation Links */}
            <ul className="flex space-x-1 lg:space-x-4 items-center">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center 
                      px-2 py-2 lg:px-3 
                      rounded-lg 
                      transition-all duration-300 
                      relative text-sm lg:text-base
                      text-blue-800 hover:bg-blue-200
                    `}
                  >
                    {item.icon}
                    {item.name}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Profile Section with Dropdown */}
          <div className="hidden md:flex relative">
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
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={userProfile?.profileImage || defaultProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="
                absolute 
                top-12 
                right-0 
                bg-white 
                shadow-lg 
                rounded-lg 
                py-2 
                w-40 
                z-50
              "
              >
                <button
                  onClick={handleLogout}
                  className="
                    flex items-center 
                    w-full 
                    px-4 py-2 
                    text-blue-800 
                    hover:bg-blue-100 
                    transition-colors
                  "
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            {/* Mobile Profile Icon with Dropdown */}
            <div className="relative mr-4">
              <div
                className="
                  w-8 h-8
                  rounded-full 
                  border-2 border-blue-500 
                  overflow-hidden 
                  cursor-pointer
                "
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={userProfile?.profileImage || defaultProfileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Mobile Profile Dropdown */}
              {profileOpen && (
                <div
                  className="
                  absolute 
                  top-10 
                  right-0 
                  bg-white 
                  shadow-lg 
                  rounded-lg 
                  py-2 
                  w-32 
                  z-50
                "
                >
                  <button
                    onClick={handleLogout}
                    className="
                      flex items-center 
                      w-full 
                      px-4 py-2 
                      text-blue-800 
                      hover:bg-blue-100 
                      transition-colors
                    "
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-blue-600 focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center 
                    px-3 py-2 
                    rounded-lg 
                    transition-all duration-300 
                    relative
                    text-blue-800 hover:bg-blue-200
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
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
