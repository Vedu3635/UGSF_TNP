import React, { useState } from "react";

const AlumniDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample data
 
  const jobs = [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "TechCorp",
      location: "San Francisco, CA",
      poster: "Alex Chen (Class of 2015)",
      tags: ["Product", "5+ Years", "Full-time"],
    },
    {
      id: 2,
      title: "Business Analyst Intern",
      company: "FinanceGroup",
      location: "New York, NY",
      poster: "Maria Davis (Class of 2018)",
      tags: ["Finance", "Entry Level", "Internship"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "HealthTech",
      location: "Remote",
      poster: "James Wilson (Class of 2019)",
      tags: ["Design", "2+ Years", "Remote"],
    },
  ];

  const connections = [
    {
      id: 1,
      name: "Michael Brown",
      role: "Software Engineer at Google",
      class: "Class of 2019",
    },
    {
      id: 2,
      name: "Jennifer Lee",
      role: "Data Scientist at Amazon",
      class: "Class of 2020",
    },
    {
      id: 3,
      name: "David Park",
      role: "Marketing Director at Startup",
      class: "Class of 2018",
    },
  ];

  const filterEvents = (category) => {
    if (category === "all") {
      return events;
    }
    return events.filter((event) => event.category === category);
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

          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search alumni, jobs, events..."
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-64"
              />
            </div>

            <div className="relative">
              <span className="text-gray-500">🔔</span>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
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
        </div>
      </header>

      {/* Main Container */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 fixed h-full bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="mt-5 px-3">
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-teal-50 text-teal-600"
            >
              <span className="mr-3">📊</span>
              Dashboard
            </a>
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1"
            >
              <span className="mr-3">👤</span>
              My Profile
            </a>
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
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-1"
            >
              <span className="mr-3">💼</span>
              Jobs & Opportunities
            </a>

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

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="py-6 px-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 mb-6 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, Sarah!
                  </h1>
                  <p className="max-w-2xl opacity-90">
                    Stay connected with your alma mater and fellow alumni.
                    Explore upcoming events, job opportunities, and ways to give
                    back to your university community.
                  </p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                  <button className="bg-white text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-md font-medium text-sm">
                    Complete Profile
                  </button>
                  <button className="bg-teal-700 text-white hover:bg-teal-800 px-4 py-2 rounded-md font-medium text-sm">
                    Explore Network
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  Network Connections
                </h3>
                <div className="text-2xl font-bold">87</div>
                <div className="text-green-500 text-xs font-medium mt-2 flex items-center">
                  <span>↑</span> 12% this month
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  Events Attended
                </h3>
                <div className="text-2xl font-bold">5</div>
                <div className="text-green-500 text-xs font-medium mt-2 flex items-center">
                  <span>↑</span> 2 since last year
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  Profile Completeness
                </h3>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-green-500 text-xs font-medium mt-2 flex items-center">
                  <span>↑</span> 10% since last update
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  Students Mentored
                </h3>
                <div className="text-2xl font-bold">2</div>
                <div className="text-gray-500 text-xs font-medium mt-2">
                  Join mentorship program
                </div>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Events Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Upcoming Events</h2>
                    <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                      View All
                    </button>
                  </div>

                  <div className="border-b border-gray-200 px-4 flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "all"
                          ? "text-teal-600 border-b-2 border-teal-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      All Events
                    </button>
                    <button
                      onClick={() => setActiveTab("reunion")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "reunion"
                          ? "text-teal-600 border-b-2 border-teal-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Reunions
                    </button>
                    <button
                      onClick={() => setActiveTab("webinar")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "webinar"
                          ? "text-teal-600 border-b-2 border-teal-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Webinars
                    </button>
                    <button
                      onClick={() => setActiveTab("networking")}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === "networking"
                          ? "text-teal-600 border-b-2 border-teal-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Networking
                    </button>
                  </div>

                  <div className="p-6">
                    {filterEvents(activeTab).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="bg-gray-50 rounded-lg min-w-14 h-16 flex flex-col items-center justify-center">
                          <span className="text-xs text-gray-500 font-medium">
                            {event.date.month}
                          </span>
                          <span className="text-xl font-bold">
                            {event.date.day}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{event.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {event.time} • {event.location}
                          </p>
                          <span
                            className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                              event.type === "online"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-teal-50 text-teal-600"
                            }`}
                          >
                            {event.type === "online" ? "Online" : "In-person"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jobs Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Job Opportunities</h2>
                    <div className="flex gap-2">
                      <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                        View All
                      </button>
                      <button className="text-sm px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                        Post a Job
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="bg-gray-100 rounded-lg min-w-12 h-12 flex items-center justify-center">
                          <img
                            src={`/api/placeholder/48/48`}
                            alt={job.company}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{job.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {job.company} • {job.location} • Posted by{" "}
                            {job.poster}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">My Profile</h2>
                    <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                      Edit
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                        <img
                          src="/api/placeholder/96/96"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mt-4">Sarah Johnson</h3>
                      <p className="text-sm text-gray-500">
                        Product Marketing Manager at TechCorp
                      </p>

                      <div className="w-full mt-6">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-1">
                            Education
                          </h4>
                          <p className="text-sm text-gray-700">
                            B.S. Business Administration, Class of 2020
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-1">Location</h4>
                          <p className="text-sm text-gray-700">
                            San Francisco, California
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1">Bio</h4>
                          <p className="text-sm text-gray-700">
                            Marketing professional with 4+ years of experience
                            in the tech industry. Passionate about product
                            strategy and customer acquisition.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
                          📱
                        </button>
                        <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
                          ✉️
                        </button>
                        <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
                          🔗
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connections Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                      Recent Connections
                    </h2>
                    <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                      View All
                    </button>
                  </div>

                  <div className="p-6">
                    {connections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                          <img
                            src={`/api/placeholder/40/40`}
                            alt={connection.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">
                            {connection.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {connection.role} • {connection.class}
                          </p>
                        </div>
                        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                          ✉️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentorship Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-semibold text-lg">
                      Mentorship Program
                    </h2>
                  </div>

                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3">🧠</div>
                    <h3 className="font-medium mb-2">Share Your Knowledge</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Help current students by becoming a mentor in your field
                      of expertise.
                    </p>
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md font-medium">
                      Join as Mentor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
