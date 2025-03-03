import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import UpdateForm from "./UpdateForm";

const StudentCard = ({ item, type, onStudentUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = (updatedData) => {
    onStudentUpdate(updatedData); // Notify parent component of the update
    setIsModalOpen(false); // Close the modal
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/deleteStudent/${item.student_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        onDelete(item.id); // Callback to parent to update the UI
        setShowDeleteConfirm(false);
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    if (isModalOpen || showDeleteConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, showDeleteConfirm]);

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
        return item.career_choice || "N/A";
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
    const token = localStorage.getItem("token");
    let userRole = "";
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.user.role || "";
        if (userRole === "tnpfaculty") return true;
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    }
    return false;
  };

  return (
    <>
      <div
        className={`${getBackgroundColor()} p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {item.first_name} {item.last_name}
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
            <p className="text-sm">{item.enrollment_id || "N/A"}</p>
          </div>
          <div>
            <span className="font-medium text-xs">Program</span>
            <p className="text-sm">{item.program || "N/A"}</p>
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
              <p className="text-sm">{item.semester || "N/A"}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full">
            {type === "placement"
              ? item.position
              : type === "higherStudies"
              ? item.admission_year
              : item.batch || "N/A"}
          </span>
          {canUpdate() && (
            <div className="space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`${getButtonColor()} text-xs text-white font-medium px-2 py-1 rounded shadow-sm transition-colors duration-200 transform hover:scale-105`}
              >
                Update
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500 hover:bg-red-600 text-xs text-white font-medium px-2 py-1 rounded shadow-sm transition-colors duration-200 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 transform transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
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
                onStudentUpdate={handleUpdate} // Pass onStudentUpdate to UpdateForm
              />
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {item.FirstName} {item.LastName}
                's record? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;
