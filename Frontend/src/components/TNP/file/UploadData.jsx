import React, { useState } from "react";
import { FileUp, FileDown } from "lucide-react";
import axios from "axios";

const UploadData = () => {
  const [fileName, setFileName] = useState("");
  const [uploadTab, setUploadTab] = useState("student");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    setIsUploading(true);
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

      // Expecting a success message, not a presigned URL
      alert(response.data.message || "File uploaded successfully!");
      setFileName("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        alert(`Upload failed: ${error.response.data.error || "Server error"}`);
      } else {
        alert("Upload failed: Network error or server unreachable.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const tabs = [
    { key: "student", label: "Student Data" },
    // { key: "placement", label: "Placement Data" },
    // { key: "higherStudies", label: "Higher Studies" },
  ];

  // Heading and description based on tab
  const getTabInfo = () => {
    switch (uploadTab) {
      case "student":
        return {
          heading: "Student Profiles",
          description:
            "Upload student data including enrollment details, contact info, and academic data.",
          template: "/templates/student-template.xlsx",
        };
      // case "placement":
      //   return {
      //     heading: "Placement Records",
      //     description:
      //       "Upload placement data including offers, packages, and recruiter details.",
      //     template: "/templates/placement-template.xlsx",
      //   };
      // case "higherStudies":
      //   return {
      //     heading: "Higher Studies Records",
      //     description:
      //       "Upload higher studies data including university admissions and scholarships.",
      //     template: "/templates/higher-studies-template.xlsx",
      //   };
      default:
        return {};
    }
  };

  const tabInfo = getTabInfo();

  const handleTemplateDownload = () => {
    const link = document.createElement("a");
    link.href = tabInfo.template;
    link.download = `${uploadTab}-template.xlsx`; // Sets the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setUploadTab(tab.key);
              setFileName("");
              setFile(null);
            }}
            className={`px-4 py-2 font-medium ${
              uploadTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">{tabInfo.heading}</h2>
        <p className="text-gray-500 mb-4">{tabInfo.description}</p>

        <button
          onClick={handleTemplateDownload}
          className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FileDown size={18} /> Download Template
        </button>

        {uploadTab === "student" && (
          <p className="text-gray-500 mb-4 text-sm">
            Required fields:{" "}
            <span className="font-medium">
              Enrollment No, Name, Program, Branch, CGPA, Email, Contact No
            </span>
          </p>
        )}
        {/* {uploadTab === "placement" && (
          <p className="text-gray-500 mb-4 text-sm">
            Required fields:{" "}
            <span className="font-medium">
              Enrollment No, Company, Package, Offer Type, Role, Joining Date
            </span>
          </p>
        )}
        {uploadTab === "higherStudies" && (
          <p className="text-gray-500 mb-4 text-sm">
            Required fields:{" "}
            <span className="font-medium">
              Enrollment No, University, Country, Program, Scholarship,
              Admission Year
            </span>
          </p>
        )} */}

        <label htmlFor="fileInput">
          <div className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50">
            <FileUp size={32} className="mb-2 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-400">
              Excel files (.xlsx) supported
            </p>
          </div>
        </label>

        <input
          type="file"
          id="fileInput"
          accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
          className="hidden"
        />

        {fileName && (
          <p className="mt-4 text-green-600">Selected File: {fileName}</p>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => {
              setFileName("");
              setFile(null);
            }}
          >
            Select Different File
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`px-6 py-2 rounded text-white ${
              isUploading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : `Upload ${tabInfo.heading}`}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UploadData;
