import React, { useState } from "react";
const UpdateForm = ({ item, type, onStudentUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    // Common fields

    first_name: item.first_name || "",
    middle_name: item.middle_name || "",
    last_name: item.last_name || "",
    email: item.email || "",
    enrollment_id: item.enrollment_id || "",
    enrollment_year: item.enrollment_year || "",
    program: item.program || "",
    phone_no: item.phone_no || "",

    // Placement specific fields
    company_name: item.company_name || "",
    position: item.position || "",
    package: item.package || "",
    status: item.status || "",
    notes: item.notes || "",

    // Higher studies specific fields
    university_name: item.university_name || "",
    course_name: item.course_name || "",
    admission_year: item.admission_year || "",

    // All students specific fields
    career_choice: item.career_choice || "",
    semester: item.semester || "",
    section: item.section || "",
    batch: item.batch || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.email) newErrors.email = "email is required";
    if (!formData.enrollment_id)
      newErrors.enrollment_id = "enrollment_id is required";
    if (!formData.program) newErrors.program = "program is required";

    // email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
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
      if (!formData.admission_year)
        newErrors.admission_year = "Intake year is required";
    }

    if (type === "all") {
      if (!formData.semester) newErrors.semester = "Semester is required";
      if (!formData.section) newErrors.section = "Section is required";
      if (!formData.batch) newErrors.batch = "Batch is required";
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
      endpoint = `http://localhost:5000/api/edit-student/updatePlacement/${item.student_id}`; // API for placement
    } else if (type === "higherStudies") {
      endpoint = `http://localhost:5000/api/edit-student/updateHigherStudies/${item.student_id}`; // API for higher studies
    } else {
      endpoint = `http://localhost:5000/api/edit-student/updateStudent/${item.student_id}`; // API for all students
    }

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      // const updatedData = await response.json();
      // onUpdate(updatedData); // Notify parent about the update
      onClose(); // Close the modal
      onStudentUpdate();
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
            {renderField("first_name", "First Name")}
            {renderField("middle_name", "Middle Name")}
            {renderField("last_name", "Last Name")}
            {renderField("email", "Email", "email")}
            {renderField("phone_no", "Phone Number", "tel")}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Academic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("enrollment_id", "Enrollment_Id")}
            {renderField("program", "Program")}
            {renderField("enrollment_year", "Enrollment Year")}
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
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border shadow-sm p-3 text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="Placed">Placed</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-600">{errors.status}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
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
              {renderField("admission_year", "Admission year")}
              {renderField("status", "Status")}
            </div>
          </div>
        )}

        {type === "all" && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Career Choice
                </label>
                <select
                  name="career_choice"
                  value={formData.career_choice}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border shadow-sm 
      transition-all duration-200 ease-in-out
      focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent
      border-gray-200 hover:border-gray-300 focus:border-blue-500
      p-3 text-sm"
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
              {renderField("section", "Section")}
              {renderField("batch", "Batch")}
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
export default UpdateForm;
