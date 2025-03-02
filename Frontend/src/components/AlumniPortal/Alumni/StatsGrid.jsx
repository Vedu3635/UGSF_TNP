import React from "react";

const StatsGrid = () => {
  return (
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
  );
};

export default StatsGrid;
