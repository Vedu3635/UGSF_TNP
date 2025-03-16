import React, { useState } from "react";
import { Upload, Download } from "lucide-react";
import UploadData from "./UploadData";
import DownloadData from "./DownloadData";
const EducationDataManager = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Education Data Manager</h1>

      <div className="flex gap-2 mb-6 w-full max-w-4xl">
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 py-3 flex justify-center items-center gap-2 rounded-md ${
            activeTab === "upload"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          <Upload size={20} /> Upload Data
        </button>
        <button
          onClick={() => setActiveTab("download")}
          className={`flex-1 py-3 flex justify-center items-center gap-2 rounded-md ${
            activeTab === "download"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          <Download size={20} /> Download Data
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {activeTab === "upload" ? <UploadData /> : <DownloadData />}
      </div>
    </div>
  );
};

export default EducationDataManager;
