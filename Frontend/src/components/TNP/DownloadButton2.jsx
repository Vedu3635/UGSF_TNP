import { Users } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
const DownloadButton2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("students");
  const [downloadStatus, setDownloadStatus] = useState({
    type: "",
    message: "",
  });
  // aa rite fetch karj frontend ma =>
  // .. let url = http://localhost:5000/api/download/excel?table=${tableType};
  //   if (year) {
  //     url += &year=${year};
  //   }
  //table parameter only: http://localhost:5000/api/download/excel?table=students
  //table and year parameters: http://localhost:5000/api/download/excel?table=students&year=2022
  const handleDownload = async (type) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/download/excel?table=${type}`,
        {
          responseType: "blob", // Ensures the response is returned as a Blob
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get the blob from the response
      const blob = response.data;

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}.xlsx`);

      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file. Please try again.");
      setDownloadStatus({
        type: "error",
        message:
          error.message || "An error occurred while downloading the file.",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        <span>Download</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={() => {
                  handleDownload("placements");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Placement Students
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleDownload("higher_studies");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Higher Studies Students
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleDownload("students");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                All Students
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default DownloadButton2;
