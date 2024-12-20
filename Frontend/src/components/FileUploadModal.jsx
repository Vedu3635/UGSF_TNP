import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </>
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

const FileUploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({ type: "", message: "" });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFileType(selectedFile)) {
      setFile(selectedFile);
      setUploadStatus({ type: "", message: "" });
    } else {
      setUploadStatus({
        type: "error",
        message: "Please select a valid Excel or CSV file",
      });
    }
  };

  const validateFileType = (file) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    return validTypes.includes(file.type);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus({
        type: "error",
        message: "Please select a file first!",
      });
      return;
    }

    setUploading(true);
    // setError("");
    setUploadStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/file/import-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadStatus({
        type: "success",
        message: response.data.message,
      });
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while uploading the file.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload File">
      {/* Upload Area */}
      <div className="space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">Excel, CSV, or PDF files</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv,.pdf"
            onChange={handleFileChange}
          />
        </label>

        {/* Selected File */}
        {file && (
          <p className="text-sm text-gray-500">Selected file: {file.name}</p>
        )}

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          {uploadStatus.message && (
            <Alert type={uploadStatus.type}>{uploadStatus.message}</Alert>
          )}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
