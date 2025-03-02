import React, { useState } from "react";
import Mentorship from "../../components/AlumniPortal/Alumni/Mentorship";
import AlumniNetwork from "../../components/AlumniPortal/Alumni/AlumniNetwork";
import AlumniProfile from "../../components/AlumniPortal/Alumni/AlumniProfile";
import JobBoard from "../../components/AlumniPortal/Alumni/JobBoard";
import Sidebar from "../../components/AlumniPortal/Alumni/Sidebar";
import StatsGrid from "../../components/AlumniPortal/Alumni/StatsGrid";
import Events from "../../components/AlumniPortal/Alumni/Events";
import MyProfile from "./MyProfile";
import Jobs from "./Jobs";

const AlumniDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // Default page

  const handleSetActivePage = (page) => {
    setActivePage(page);
    localStorage.setItem("activePage", page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 text-white h-8 w-8 rounded-md flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-teal-600 font-bold text-lg">
              AlumniConnect
            </span>
          </div>

          {/* Responsive Search and Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search alumni, jobs, events..."
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-64 transition-all"
              />
            </div>

            <div className="relative">
              <button className="text-gray-500 hover:text-teal-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-teal-500">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium">Sarah Johnson</div>
                <div className="text-xs text-gray-500">Class of 2020</div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {isSearchExpanded ? (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full"
                    autoFocus
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="relative">
                  <button className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    3
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 inset-x-0 bg-white shadow-md z-20 md:hidden">
          <div className="px-4 py-3 flex items-center gap-2 border-b">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-teal-500">
              <img
                src="/api/placeholder/40/40"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium">Sarah Johnson</div>
              <div className="text-xs text-gray-500">Class of 2020</div>
            </div>
          </div>
          <nav className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Network
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Jobs
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </nav>
        </div>
      )}

      {/* Main Container */}
      <div className="flex pt-16">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar
            setActivePage={handleSetActivePage}
            activePage={activePage}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 transition-all">
          {activePage == "dashboard" && (
            <main className="py-6 px-4 sm:px-6 lg:px-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 mb-6 text-white shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Welcome back, Sarah!
                    </h1>
                    <p className="max-w-2xl opacity-90 text-sm md:text-base">
                      Stay connected with your alma mater and fellow alumni.
                      Explore upcoming events, job opportunities, and ways to
                      give back to your university community.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4 sm:mt-0">
                    <button className="bg-white text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-md font-medium text-sm transition-colors">
                      Complete Profile
                    </button>
                    <button className="bg-teal-700 text-white hover:bg-teal-800 px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                      Explore Network
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mb-6">
                <StatsGrid />
              </div>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                  <Events />
                  {/* Jobs Card */}
                  <JobBoard />

                  {/* Additional Content Area */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-gray-800">
                        Latest University News
                      </h2>
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {/* News Item */}
                      <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <h3 className="font-medium text-gray-800">
                          New Research Center Opens on Campus
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          The university has opened a state-of-the-art research
                          facility focused on sustainable technology
                          development.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            February 15, 2025
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Campus News
                          </span>
                        </div>
                      </div>

                      {/* News Item */}
                      <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <h3 className="font-medium text-gray-800">
                          Alumni Fund Surpasses $5M Goal
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          The annual alumni fundraising campaign has exceeded
                          its goal, supporting 200+ student scholarships.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            February 10, 2025
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Fundraising
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                  {/* Profile Card */}
                  <AlumniProfile />

                  {/* Connections Card */}
                  <AlumniNetwork />

                  {/* Mentorship Card */}
                  <Mentorship />
                </div>
              </div>
            </main>
          )}

          {activePage == "myProfile" && <MyProfile />}
          {activePage == "Jobs" && <Jobs />}
          {/* Footer */}
          <footer className="mt-12 bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div className="mb-4 md:mb-0">
                  <p>© 2025 AlumniConnect. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-teal-600 transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
