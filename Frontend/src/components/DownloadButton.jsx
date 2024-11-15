import React, { useState } from "react";
import { Download } from "lucide-react";
import axios from "axios";

const DownloadButton = () => {
  const [downloadStatus, setDownloadStatus] = useState({ type: "", message: "" });

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/file/export-excel",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloadStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while downloading the file.",
      });
    }
  };

  return (
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