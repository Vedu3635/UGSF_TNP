import React, { useState } from "react";
import { Filter } from "lucide-react";

const DownloadData = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dataType: "students", // Default table name
    year: "", // Optional year filter
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDownload = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      // Construct query parameters based on available filters
      const queryParams = new URLSearchParams({
        table: filters.dataType,
        ...(filters.year && { year: filters.year }), // Only include year if it exists
      }).toString();

      const response = await fetch(
        `http://localhost:5000/api/download/excel?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Add any necessary authorization headers here if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Get filename from headers or generate default
      const filename =
        response.headers.get("Content-Disposition")?.split("filename=")[1] ||
        `${filters.dataType}-${filters.year || "all"}.xlsx`;

      // Convert response to blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Download Education Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data Type</label>
          <select
            name="dataType"
            value={filters.dataType}
            onChange={handleFilterChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="students">Student Details</option>
            <option value="placements">Placement Details</option>
            <option value="higher_studies">Higher Studies Details</option>
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
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded"
            >
              <option value="">Select Graduation Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              {/* Add more years as needed */}
            </select>
            {/* You can keep other filters in the UI if you plan to expand the API later */}
          </div>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full disabled:bg-blue-300"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? "Downloading..." : "Download Students Data"}
      </button>
    </div>
  );
};

export default DownloadData;
