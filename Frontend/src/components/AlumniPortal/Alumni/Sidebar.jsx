import React from "react";

const Sidebar = ({ setActivePage, activePage }) => {
  const handleButtonClick = (button) => {
    setActivePage(button);
  };
  return (
    <div className="w-64 fixed h-full bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="mt-5 px-3">
        <button
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-teal-50 text-teal-600`}
          onClick={() => handleButtonClick("dashboard")}
        >
          <span className="mr-3">📊</span>
          Dashboard
        </button>
        <button
          className={
            "group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1"
          }
          onClick={() => handleButtonClick("myProfile")}
        >
          <span className="mr-3">👤</span>
          My Profile
        </button>
        <a
          href="#"
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1"
        >
          <span className="mr-3">🔗</span>
          Connections
        </a>
        <a
          href="#"
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1"
        >
          <span className="mr-3">📅</span>
          Events
        </a>
        <button
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1`}
          onClick={() => handleButtonClick("Jobs")}
        >
          <span className="mr-3">💼</span>
          Jobs & Opportunities
        </button>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Contribute
          </h3>
          <a
            href="#"
            className="mt-1 group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3">🧠</span>
            Mentorship
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3">💭</span>
            Share Experience
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3">🏢</span>
            Post Job
          </a>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </h3>
          <a
            href="#"
            className="mt-1 group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3">⚙️</span>
            Account Settings
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3">❓</span>
            Help & Support
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
