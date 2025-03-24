import React, { useState } from "react";
import axios from "axios";
import { Filter } from "lucide-react";

const DownloadData = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dataType: "students", // Default table name
    year: "", // Optional year filter for students
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common download utility function
  const triggerDownload = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Axios instance configuration
  const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: "blob", // Important for downloading files
  });

  const handleStudentDownload = async () => {
    setIsLoading(true);
    try {
      const params = {
        table: filters.dataType,
        ...(filters.year && { year: filters.year }),
      };

      const response = await apiClient.get("/download/excel", { params });

      const filename =
        response.headers["content-disposition"]?.split("filename=")[1] ||
        `${filters.dataType}-${filters.year || "all"}.xlsx`;

      triggerDownload(response.data, filename);
    } catch (error) {
      console.error("Error downloading student data:", error);
      alert("Failed to download student data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyDownload = async () => {
    setIsLoading(true);
    try {
      const companyType =
        filters.dataType === "upcoming_companies" ? "upcoming" : "visited";
      const response = await apiClient.get("/download/companies", {
        params: { type: companyType },
      });

      const filename =
        response.headers["content-disposition"]?.split("filename=")[1] ||
        `${filters.dataType}.xlsx`;

      triggerDownload(response.data, filename);
    } catch (error) {
      console.error("Error downloading company data:", error);
      alert("Failed to download company data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (
      ["students", "placements", "higher_studies"].includes(filters.dataType)
    ) {
      handleStudentDownload();
    } else if (
      ["upcoming_companies", "visited_companies"].includes(filters.dataType)
    ) {
      handleCompanyDownload();
    }
  };

  const getButtonText = () => {
    if (
      ["students", "placements", "higher_studies"].includes(filters.dataType)
    ) {
      return isLoading ? "Downloading..." : "Download Students Data";
    }
    return isLoading ? "Downloading..." : "Download Companies Data";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Download Education Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Students Data
          </label>
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
        <div>
          <label className="block text-sm font-medium mb-1">
            Companies Data
          </label>
          <select
            name="dataType"
            value={filters.dataType}
            onChange={handleFilterChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="upcoming_companies">Upcoming Companies</option>
            <option value="visited_companies">Visited Companies</option>
          </select>
        </div>
      </div>

      <button
        className="flex items-center gap-2 text-blue-600 mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={18} /> {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters &&
        ["students", "placements", "higher_studies"].includes(
          filters.dataType
        ) && (
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Enrollment Year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
        )}

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full disabled:bg-blue-300"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default DownloadData;
