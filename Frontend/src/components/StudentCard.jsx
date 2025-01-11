import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const StudentCard = ({ item, type, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
                onUpdate={(updatedData) => {
                  onUpdate(updatedData);
                  setIsModalOpen(false);
                }}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UpdateForm = ({ item, type, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    // Common fields
    FirstName: item.FirstName || "",
    LastName: item.LastName || "",
    Email: item.Email || "",
    Enrollment_Id: item.Enrollment_Id || "",
    Enrollment_Year: item.Enrollment_Year || "",
    Program: item.Program || "",
    PhoneNo: item.PhoneNo || "",

    // Placement specific fields
    company_name: item.company_name || "",
    position: item.position || "",
    package: item.package || "",
    Status: item.Status || "",
    Notes: item.Notes || "",

    // Higher studies specific fields
    university_name: item.university_name || "",
    course_name: item.course_name || "",
    intake_year: item.intake_year || "",

    // All students specific fields
    Career_Choice: item.Career_Choice || "",
    Semester: item.Semester || "",
    Class: item.Class || "",
    Batch: item.Batch || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.Email) newErrors.Email = "Email is required";
    if (!formData.Enrollment_Id)
      newErrors.Enrollment_Id = "Enrollment_Id is required";
    if (!formData.Program) newErrors.Program = "Program is required";

    // Email validation
    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Invalid email format";
    }

    // Type-specific validations
    if (type === "placement") {
      if (!formData.company_name)
        newErrors.company_name = "Company name is required";
      if (!formData.position) newErrors.position = "Position is required";
      if (!formData.package) newErrors.package = "Package is required";
    }

    if (type === "higherStudies") {
      if (!formData.university_name)
        newErrors.university_name = "University name is required";
      if (!formData.course_name)
        newErrors.course_name = "Course name is required";
      if (!formData.intake_year)
        newErrors.intake_year = "Intake year is required";
    }

    if (type === "all") {
      if (!formData.Semester) newErrors.Semester = "Semester is required";
      if (!formData.Class) newErrors.Class = "Class is required";
      if (!formData.Batch) newErrors.Batch = "Batch is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`/api/students/${item.Enrollment_Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updatedData = await response.json();
      onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student information");
    }
  };

  const renderField = (name, label, type = "text") => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-lg border shadow-sm 
          transition-all duration-200 ease-in-out
          focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent
          ${
            errors[name]
              ? "border-red-300 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
          }
          p-3 text-sm`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* Main content area with padding for footer */}
      <div className="p-6 pb-24 space-y-8">
        {/* Section headers for better organization */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("FirstName", "First Name")}
            {renderField("LastName", "Last Name")}
            {renderField("Email", "Email", "email")}
            {renderField("PhoneNo", "Phone Number", "tel")}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Academic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Enrollment_Id", "Enrollment_Id")}
            {renderField("Program", "Program")}
            {renderField("Enrollment_Year", "Enrollment Year")}
          </div>
        </div>

        {/* Type-specific fields with section headers */}
        {type === "placement" && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Placement Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("company_name", "Company Name")}
              {renderField("position", "Position")}
              {renderField("package", "Package (₹)", "number")}
              {renderField("Status", "Status", "")}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="Notes"
                  value={formData.Notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 p-3 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {type === "higherStudies" && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Higher Studies Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("university_name", "University Name")}
              {renderField("course_name", "Course Name")}
              {renderField("intake_year", "Intake Year")}
              {renderField("Status", "Status")}
            </div>
          </div>
        )}

        {type === "all" && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Career_Choice", "Career Choice")}
              {renderField("Semester", "Semester")}
              {renderField("Class", "Class")}
              {renderField("Batch", "Batch")}
            </div>
          </div>
        )}
      </div>

      {/* Footer with fixed positioning */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentCard;
