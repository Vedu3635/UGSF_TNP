import React from "react";
import {
  LayoutDashboard,
  Upload,
  Users,
  Building2,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
const LeftSlider2 = ({ setActiveSection, activeSection }) => {
  const handleButtonClick = (button) => {
    setActiveSection(button);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-blue-900 text-white flex flex-col">
      <div className="p-4 border-b border-blue-800">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      {/* Main Navigation Section */}
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full flex items-center space-x-3 p-2 rounded transition duration-200 ${
                activeSection === "dashboard"
                  ? "bg-blue-800"
                  : "hover:bg-blue-800"
              }`}
              onClick={() => handleButtonClick("dashboard")}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              className={`w-full flex items-center space-x-3 p-2 rounded transition duration-200 ${
                activeSection === "upload" ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
              onClick={() => handleButtonClick("upload")}
            >
              <Upload className="w-5 h-5" />
              <span>Upload File</span>
            </button>
          </li>

          <li>
            <button
              className={`w-full flex items-center space-x-3 p-2 rounded transition duration-200 ${
                activeSection === "studentList"
                  ? "bg-blue-800"
                  : "hover:bg-blue-800"
              }`}
              onClick={() => handleButtonClick("studentList")}
            >
              <Users className="w-5 h-5" />
              <span>Student List</span>
            </button>
          </li>

          <li>
            <button
              className={`w-full flex items-center space-x-3 p-2 rounded transition duration-200 ${
                activeSection === "companies"
                  ? "bg-blue-800"
                  : "hover:bg-blue-800"
              }`}
              onClick={() => handleButtonClick("companies")}
            >
              <Building2 className="w-5 h-5" />
              <span>Companies</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button Section */}
      <div className="p-4 border-t border-blue-800">
        <button
          className="w-full flex items-center space-x-3 p-2 hover:bg-red-500 rounded transition duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default LeftSlider2;
