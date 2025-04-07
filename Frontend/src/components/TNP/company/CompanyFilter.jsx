import React, { useState } from "react";

const CompanyFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    industry: "",
    companyName: "",
    jobRole: "",
    hiringDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      industry: "",
      companyName: "",
      jobRole: "",
      hiringDate: "",
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="mb-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0">
          Filter Companies
        </h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group/item transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
          <label className="block text-base text-gray-500 font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={filters.companyName}
            onChange={handleInputChange}
            placeholder="Search by company..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="group/item transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
          <label className="block text-base text-gray-500 font-medium mb-2">
            Industry Domain
          </label>
          <input
            type="text"
            name="industry"
            value={filters.industry}
            onChange={handleInputChange}
            placeholder="Search by industry..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="group/item transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
          <label className="block text-base text-gray-500 font-medium mb-2">
            Job Role
          </label>
          <input
            type="text"
            name="jobRole"
            value={filters.jobRole}
            onChange={handleInputChange}
            placeholder="Search by role..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="group/item transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
          <label className="block text-base text-gray-500 font-medium mb-2">
            Hiring Date
          </label>
          <input
            type="date"
            name="hiringDate"
            value={filters.hiringDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyFilter;
