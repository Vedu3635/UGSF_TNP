import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const Navbar = ({ userProfile }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Default profile image in case no image is provided
  const defaultProfileImage = "https://i.pravatar.cc/150?u=default";

  // Navigation items with icons
  const navItems = [
    { 
      name: 'TNP', 
      path: '/', 
      icon: <HomeIcon className="w-5 h-5 mr-2" /> 
    },
    { 
      name: 'EVENTS', 
      path: '/events', 
      icon: <CalendarIcon className="w-5 h-5 mr-2" /> 
    },
    { 
      name: 'QUIZ', 
      path: '/quiz', 
      icon: <AcademicCapIcon className="w-5 h-5 mr-2" /> 
    },
    { 
      name: 'RESEARCH', 
      path: '/research', 
      icon: <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-2" /> 
    }
    ,
    { 
      name: 'Alumni', 
      path: '/alumni', 
      icon: <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-2" /> 
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg w-full sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 md:flex md:items-center md:justify-between">
        {/* Logo and Mobile Toggle */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <UserCircleIcon className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-800">CareerVista</span>
          </div>

          {/* Mobile Menu Toggle */}
          <div 
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open && <XMarkIcon className="w-6 h-6 text-blue-600" />}
          </div>
        </div>

        {/* Navigation Menu */}
        <div 
          className={`
            md:flex md:items-center 
            ${open ? 'block' : 'hidden'}
            transition-all duration-300 ease-in-out
          `}
        >
          <ul className="md:flex md:space-x-6 items-center">
            {navItems.map((item) => (
              <li key={item.path} className="my-2 md:my-0">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center 
                    px-3 py-2 
                    rounded-lg 
                    transition-all duration-300 
                    relative
                    ${isActive 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-blue-800 hover:bg-blue-200'}
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

        {/* Profile Section */}
        <div className="hidden md:block">
          <div 
            className="
              w-12 h-12 
              rounded-full 
              border-2 border-blue-500 
              overflow-hidden 
              cursor-pointer 
              hover:shadow-lg 
              transition-all 
              transform hover:scale-110
            "
            onClick={() => navigate('/profile')}
          >
            <img 
              src={userProfile?.profileImage || defaultProfileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
