import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import UpdateForm from "./UpdateForm";

const StudentCard = ({ item, type, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (updatedData) => {
    // Update the state with the new data
    setStudentData(updatedData);
    // You can also do other tasks like closing the modal or updating the list
  };
  useEffect(() => {
    // Disable scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount to ensure scrolling is enabled
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const getBackgroundColor = () => {
    switch (type) {
      case "all":
        return "bg-purple-100";
      case "placement":
        return "bg-blue-100";
      case "higherStudies":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "all":
        return "bg-purple-500 hover:bg-purple-600";
      case "placement":
        return "bg-blue-500 hover:bg-blue-600";
      case "higherStudies":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case "all":
        return "text-purple-600";
      case "placement":
        return "text-blue-600";
      case "higherStudies":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = () => {
    switch (type) {
      case "all":
        return item.Career_Choice || "N/A";
      case "placement":
        return `${
          item.package ? (item.package / 100000).toFixed(1) + " LPA" : "N/A"
        }`;
      case "higherStudies":
        return item.university_name || "N/A";
      default:
        return "N/A";
    }
  };

  const canUpdate = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    let userRole = "";
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.user.role || "";
        if (userRole === "ADMIN") return true; // Admin can update all
      } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
        return false;
      }
    }
    return false; // Viewer or unauthorized user cannot update
  };

  return (
    <>
      <div
        className={`${getBackgroundColor()} p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {item.FirstName} {item.LastName}
          </h2>
          <span
            className={`text-sm font-semibold bg-white px-3 py-1 rounded-full ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-gray-600 mt-2">
          <div>
            <span className="font-medium text-xs">Roll Number</span>
            <p className="text-sm">{item.Enrollment_Id || "N/A"}</p>
          </div>
          <div>
            <span className="font-medium text-xs">Program</span>
            <p className="text-sm">{item.Program || "N/A"}</p>
          </div>
          {type === "placement" && (
            <div>
              <span className="font-medium text-xs">Company</span>
              <p className="text-sm">{item.company_name || "N/A"}</p>
            </div>
          )}
          {type === "higherStudies" && (
            <div>
              <span className="font-medium text-xs">Course</span>
              <p className="text-sm">{item.course_name || "N/A"}</p>
            </div>
          )}
          {type === "all" && (
            <div>
              <span className="font-medium text-xs">Semester</span>
              <p className="text-sm">{item.Semester || "N/A"}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full">
            {type === "placement"
              ? item.position
              : type === "higherStudies"
              ? item.intake_year
              : item.Batch || "N/A"}
          </span>
          {/* Conditionally render the Update button */}
          {canUpdate() && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${getButtonColor()} text-xs text-white font-medium px-2 py-1 rounded shadow-sm transition-colors duration-200 transform hover:scale-105`}
            >
              Update
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop with blur effect */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal container with scrolling */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 transform transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
              {/* Modal header - fixed at top */}
              <div className="sticky top-0 z-50 bg-white rounded-t-2xl border-b border-gray-100">
                <div className="flex justify-between items-center p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Update Student Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Make changes to student details below
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <UpdateForm
                item={item}
                type={type}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;
