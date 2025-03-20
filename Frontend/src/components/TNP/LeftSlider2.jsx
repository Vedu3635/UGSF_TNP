import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, Building2, LogOut, Files } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LeftSlider2 = ({
  isExpanded,
  setIsExpanded,
  setActiveSection,
  activeSection,
  onUploadClick,
}) => {
  const [userRole, setUserRole] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.user.role);
      } catch (err) {
        console.error("Error decoding token:", err);
        setUserRole(null);
      }
    }

    // Set initial sidebar state based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Use MD breakpoint (768px) instead of LG
        setIsExpanded(true); // Expanded on desktop/tablet
      } else {
        setIsExpanded(false); // Collapsed on mobile
      }
    };

    // Run once on mount to set initial state
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      setIsMounted(false);
    };
  }, [setIsExpanded]);

  const handleButtonClick = (button) => {
    setActiveSection(button);
    if (window.innerWidth < 768) {
      setIsExpanded(false); // Collapse on mobile when clicked
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Navigation items configuration
  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      section: "dashboard",
      onClick: () => handleButtonClick("dashboard"),
      role: "all",
    },
    {
      name: "File Management",
      icon: <Files className="w-5 h-5" />,
      section: "upload",
      onClick: () => handleButtonClick("upload"),
      role: "tnpfaculty",
    },
    {
      name: "Student List",
      icon: <Users className="w-5 h-5" />,
      section: "studentList",
      onClick: () => handleButtonClick("studentList"),
      role: "all",
    },
    {
      name: "Register Companies",
      icon: <Building2 className="w-5 h-5" />,
      section: "companiesReg",
      onClick: () => handleButtonClick("companiesReg"),
      role: "tnpfaculty",
    },
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    (item) => item.role === "all" || item.role === userRole
  );

  return (
    <>
      {/* Toggle Button - Visible on medium and larger screens */}
      {/* <button
        className={`fixed top-4 z-50 md:flex hidden bg-white text-black p-2 rounded-md shadow-lg hover:bg-blue-800 transition-all duration-300 ease-in-out
          ${isExpanded ? "left-48" : "left-4"}
        `}
        onClick={toggleSidebar}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <X size={20} /> : <Menu size={20} />}
      </button> */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white flex flex-col z-40 
          transition-all duration-300 ease-in-out shadow-lg
          ${isExpanded ? "w-64" : "w-16"}`}
      >
        {/* Logo or Brand Area */}
        <div className="p-4 border-b border-blue-800 flex items-center justify-center h-16">
          {isExpanded ? (
            <span className="font-bold text-lg">TNP Portal</span>
          ) : (
            <span className="font-bold text-lg">TNP</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-2">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.section}>
                <button
                  className={`w-full flex items-center p-2 rounded transition-all duration-200 
                    ${
                      activeSection === item.section
                        ? "bg-blue-800 font-medium"
                        : "hover:bg-blue-800/70"
                    } 
                    ${
                      isExpanded
                        ? "justify-start space-x-3 px-4"
                        : "justify-center"
                    }`}
                  onClick={item.onClick}
                  title={!isExpanded ? item.name : ""}
                >
                  {item.icon}
                  {isExpanded && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Controls */}
        <div className="p-2 border-t border-blue-800">
          {/* Toggle sidebar on mobile/tablet */}

          {/* Logout Button */}
          <button
            className={`w-full flex items-center p-2 rounded transition-all duration-200
              hover:bg-red-500 text-white
              ${
                isExpanded ? "justify-start space-x-3 px-4" : "justify-center"
              }`}
            onClick={handleLogout}
            title={!isExpanded ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSlider2;
