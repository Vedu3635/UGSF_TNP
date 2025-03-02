import React from "react";

const AlumniNetwork = () => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Recent Connections</h2>
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
              <h3 className="text-sm font-medium">{connection.name}</h3>
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
  );
};

export default AlumniNetwork;
