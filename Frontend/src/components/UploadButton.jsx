import React, { useState } from "react";
import { Upload, File, Building2, Loader2, X } from "lucide-react";
import axios from "axios";
import CompanyRegistrationForm from "./CompanyRegistrationForm";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
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

const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ type: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateFileType(file)) {
        setSelectedFile(file);
        setUploadStatus({ type: "", message: "" });
      } else {
        setUploadStatus({
          type: "error",
          message: "Please select a valid Excel or CSV file",
        });
      }
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
    if (!selectedFile) {
      setUploadStatus({
        type: "error",
        message: "Please select a file first!",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: "", message: "" });
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/file/import-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus({
        type: "success",
        message: response.data.message,
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while uploading the file.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* File Upload Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-gray-800 text-lg font-medium mb-4">Upload File</h3>

        <div className="space-y-4">
          <label
            htmlFor="file-upload"
            className={`
              w-full flex items-center justify-center gap-2 p-3 
              border-2 border-dashed border-blue-200 rounded-lg
              cursor-pointer transition duration-200
              ${selectedFile ? "bg-blue-50" : "bg-white hover:bg-blue-50"}
            `}
          >
            <Upload className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-medium">
              {selectedFile ? "Change File" : "Choose File"}
            </span>
          </label>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls"
          />

          {selectedFile && (
            <div className="bg-blue-50 rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center text-blue-800 text-sm">
                <File className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate max-w-[180px]">
                  {selectedFile.name}
                </span>
              </div>
            </div>
          )}

          {uploadStatus.message && (
            <Alert type={uploadStatus.type}>{uploadStatus.message}</Alert>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg p-3 
                     flex items-center justify-center gap-2 transition duration-200
                     disabled:bg-emerald-300 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload
              </>
            )}
          </button>
        </div>
      </div>

      {/* Company Registration Button & Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-3 
                 flex items-center justify-center gap-2 transition duration-200"
      >
        <Building2 className="w-5 h-5" />
        Register Company
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Company Registration"
      >
        <CompanyRegistrationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default UploadButton;
