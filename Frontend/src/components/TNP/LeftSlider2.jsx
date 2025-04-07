import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, Building2, LogOut, Files } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import { useAuth } from "../../pages/AuthContext"; // Import useAuth

const LeftSlider2 = ({
  isExpanded,
  setIsExpanded,
  setActiveSection,
  activeSection,
}) => {
  const [userRole, setUserRole] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  // const { logout } = useAuth(); // Get logout from AuthContext

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
    } else {
      setUserRole(null);
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
      setIsMounted(false); // Collapse on mobile when clicked
    };
  }, [setIsExpanded]);

  const handleButtonClick = (button) => {
    setActiveSection(button);
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  // const handleLogout = () => {
  //   logout(); // Use AuthContext logout
  //   navigate("/login", { replace: true }); // Navigate to login
  // };

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

  if (!isMounted) return null;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white flex flex-col z-40 
        transition-all duration-300 ease-in-out shadow-lg
        ${isExpanded ? "w-64" : "w-16"}`}
      >
        {/* Logo or Brand Area */}
        <div className="p-4 border-b border-blue-800 flex items-center justify-center h-16">
          {isExpanded ? (
            <span className="font-bold text-lg">CareerMarg</span>
          ) : (
            <span className="font-bold text-lg"></span>
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
          {/* <button
            className={`w-full flex items-center p-2 rounded transition-all duration-200
            hover:bg-red-500 text-white
            ${isExpanded ? "justify-start space-x-3 px-4" : "justify-center"}`}
            onClick={handleLogout}
            title={!isExpanded ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {isExpanded && <span>Logout</span>}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LeftSlider2;
