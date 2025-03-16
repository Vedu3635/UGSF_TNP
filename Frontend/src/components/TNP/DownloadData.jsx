import React, { useState } from "react";
import { Filter } from "lucide-react";

const DownloadData = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Download Education Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data Type</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Student Details</option>
            <option>Placement Details</option>
            <option>Higher Studies Details</option>
          </select>
        </div>
      </div>

      <button
        className="flex items-center gap-2 text-blue-600 mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={18} /> {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enrollment Number"
              className="border px-3 py-2 rounded"
            />
            <select className="border px-3 py-2 rounded">
              <option>Select Program</option>
            </select>

            <select className="border px-3 py-2 rounded">
              <option>Select Branch</option>
            </select>
            <select className="border px-3 py-2 rounded">
              <option>Select Focus Area</option>
            </select>

            <select className="border px-3 py-2 rounded">
              <option>Select Placement Status</option>
            </select>
            <select className="border px-3 py-2 rounded">
              <option>Select Higher Studies Status</option>
            </select>

            <select className="border px-3 py-2 rounded">
              <option>Select Graduation Year</option>
            </select>
            <input
              type="text"
              placeholder="Company Name"
              className="border px-3 py-2 rounded"
            />

            {/* CGPA Range */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                CGPA Range: 0 - 10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">
        Download Students Data
      </button>
    </div>
  );
};

export default DownloadData;
