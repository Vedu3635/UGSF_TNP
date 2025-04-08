import React, { useState } from "react";
import axios from "axios";

const UpdateForm = ({ item, type, onStudentUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    // Common fields
    name: item.name || "",
    email: item.email || "",
    enrollment_id: item.enrollment_id || "",
    enrollment_year: item.enrollment_year || "",
    batch: item.batch || "",
    program: item.program || "",

    // Placement specific fields
    company_name: item.company_name || "",
    position: item.position || "",
    salary_package: item.salary_package || "",
    placement_status: item.placement_status || "",

    // Higher studies specific fields
    university_name: item.university_name || "",
    course_name: item.course_name || "",
    specialization: item.specialization || "",
    admission_year: item.admission_year || "",
    address_of_institute: item.address_of_institute || "",
    city_of_institute: item.city_of_institute || "",
    country_of_institute: item.country_of_institute || "",

    // All students specific fields
    career_choice: item.career_choice || "",
    semester: item.semester || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.enrollment_id)
      newErrors.enrollment_id = "Enrollment_id is required";
    if (!formData.enrollment_year)
      newErrors.enrollment_year = "Enrollment_year is required";
    if (!formData.batch) newErrors.batch = "Batch is required";
    if (!formData.program) newErrors.program = "Program is required";

    // email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Type-specific validations
    if (type === "placement") {
      if (!formData.company_name)
        newErrors.company_name = "Company name is required";
      if (!formData.position) newErrors.position = "Position is required";
      if (!formData.salary_package)
        newErrors.salary_package = "Salary Package is required";
    }

    if (type === "higherStudies") {
      if (!formData.university_name)
        newErrors.university_name = "University name is required";
      if (!formData.course_name)
        newErrors.course_name = "Course name is required";
      if (!formData.admission_year)
        newErrors.admission_year = "Intake year is required";
    }

    if (type === "all") {
      if (!formData.semester) newErrors.semester = "Semester is required";
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

    let endpoint = "";
    // Determine the API endpoint based on the type of data
    if (type === "placement") {
      endpoint = `${
        import.meta.env.VITE_API_URL
      }/edit_student/updatePlacement/${item.student_id}`; // API for placement
    } else if (type === "higherStudies") {
      endpoint = `${
        import.meta.env.VITE_API_URL
      }/edit_student/updateHigherStudies/${item.student_id}`; // API for higher studies
    } else {
      endpoint = `${import.meta.env.VITE_API_URL}/edit_student/updateStudent/${
        item.student_id
      }`; // API for all students
    }

    // Retrieve the token from storage (e.g., localStorage)
    const token = localStorage.getItem("token"); // Adjust based on where you store the token

    if (!token) {
      console.error("No token found. User may not be logged in.");
      alert("Please log in to update student information.");
      return;
    }

    try {
      const response = await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      // Axios automatically throws an error for non-2xx responses, so no need to check response.ok
      onClose();
      onStudentUpdate();
    } catch (error) {
      console.error("Error updating student:", error);
      // Handle error response from the server if available
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to update";
      alert(`Failed to update student information: ${errorMessage}`);
    }
  };

  const renderField = (name, label, type = "text") => (
    <div className="space-y-1 w-full">
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
          p-2 sm:p-3 text-sm`}
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
    <form
      onSubmit={handleSubmit}
      className="max-w-full overflow-hidden p-4 sm:p-6 pb-24 space-y-6 sm:space-y-8 overflow-y-auto max-h-[calc(100vh-120px)]"
    >
      {/* Main content area with padding for footer */}

      {/* Section headers for better organization */}
      <div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderField("name", "Name")}
          {renderField("email", "Email", "email")}
        </div>
      </div>

      <div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Academic Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {renderField("enrollment_id", "Enrollment_Id")}
          {renderField("program", "Program")}
          {renderField("enrollment_year", "Enrollment Year")}
          {renderField("batch", "Batch")}
        </div>
      </div>

      {/* Type-specific fields with section headers */}
      {type === "placement" && (
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Placement Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {renderField("company_name", "Company Name")}
            {renderField("position", "Position")}
            {renderField("salary_package", "Salary Package (₹)", "number")}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="placement_status"
                value={formData.placement_status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border shadow-sm p-3 text-sm"
              >
                <option value="">Select Status</option>
                <option value="Placed">Placed</option>
                <option value="Not Placed">Not Placed</option>
              </select>
              {errors.placement_status && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.placement_status}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {type === "higherStudies" && (
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Higher Studies Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {renderField("university_name", "University Name")}
            {renderField("course_name", "Course Name")}
            {renderField("specialization", "Specialization")}
            {renderField("admission_year", "Admission year")}
            {renderField("address_of_institute", "Address of Institute")}
            {renderField("city_of_institute", "City of Institute")}
            {renderField("country_of_institute", "Country of Institute")}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="higher_studies_status"
                value={formData.higher_studies_status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border shadow-sm p-3 text-sm"
              >
                <option value="">Select Status</option>
                <option value="Admitted">Admitted</option>
                <option value="In Process">In Process</option>
                <option value="Rejected">Rejected</option>
              </select>
              {errors.placement_status && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.placement_status}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {type === "all" && (
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Career Choice
              </label>
              <select
                name="career_choice"
                value={formData.career_choice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border shadow-sm 
                    transition-all duration-200 ease-in-out
                    focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 
                    border-gray-200 hover:border-gray-300 focus:border-blue-500
                    p-2 sm:p-3 text-sm"
              >
                <option value="">Select Career Choice</option>
                <option value="Higher Studies">Higher Studies</option>
                <option value="Job Placement">Job Placement</option>
                <option value="Entrepreneurial Venture">
                  Entrepreneurial Venture
                </option>
              </select>
              {errors.career_choice && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.career_choice}
                </p>
              )}
            </div>
            {renderField("semester", "Semester")}
          </div>
        </div>
      )}

      {/* Footer with fixed positioning */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 sm:p-6 rounded-b-2xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
