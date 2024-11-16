import React, { useState } from "react";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const [selectedTable, setSelectedTable] = useState("students"); // Default table
  const [downloadStatus, setDownloadStatus] = useState({
    type: "",
    message: "",
  });

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/download/excel?table=${selectedTable}`
        // http://localhost:5000/api/download/excel?table=placement_details
      );

      if (!response.ok) {
        throw new Error(
          `An error occurred: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedTable}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloadStatus({
        type: "error",
        message:
          error.message || "An error occurred while downloading the file.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="table-select"
          className="text-sm font-medium text-white"
        >
          Select Table to Export:
        </label>
        <select
          id="table-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-black"
        >
          <option value="students">Students</option>
          <option value="higher_studies_details">Higher Studies Details</option>
          <option value="placement_details">Placement Details</option>
        </select>
      </div>
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 
                 flex items-center justify-center gap-2 transition duration-200"
      >
        <Download className="w-5 h-5" />
        Download Excel
        {downloadStatus.message && (
          <Alert type={downloadStatus.type}>{downloadStatus.message}</Alert>
        )}
      </button>
    </div>
  );
};

const Alert = ({ type, children }) => (
  <div
    className={`p-4 rounded-lg ${
      type === "error"
        ? "bg-red-50 text-red-800 border border-red-200"
        : "bg-green-50 text-green-800 border border-green-200"
    }`}
  >
    {children}
  </div>
);

export default DownloadButton;
