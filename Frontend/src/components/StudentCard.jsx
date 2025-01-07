import React, { useState } from 'react';

const StudentCard = ({ item, type, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        return `${item.package ? (item.package / 100000).toFixed(1) + ' LPA' : 'N/A'}`;
      case "higherStudies":
        return item.university_name || "N/A";
      default:
        return "N/A";
    }
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
            <p className="text-sm">{item.StudentId || "N/A"}</p>
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
          <button
            onClick={() => setIsModalOpen(true)}
            className={`${getButtonColor()} text-xs text-white font-medium px-2 py-1 rounded shadow-sm transition-colors duration-200 transform hover:scale-105`}
          >
            Update
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Update Student Information</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
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
    FirstName: item.FirstName || '',
    LastName: item.LastName || '',
    Email: item.Email || '',
    StudentId: item.StudentId || '',
    Enrollment_Year: item.Enrollment_Year || '',
    Program: item.Program || '',
    PhoneNo: item.PhoneNo || '',
    
    // Placement specific fields
    company_name: item.company_name || '',
    position: item.position || '',
    package: item.package || '',
    Status: item.Status || '',
    Notes: item.Notes || '',
    
    // Higher studies specific fields
    university_name: item.university_name || '',
    course_name: item.course_name || '',
    intake_year: item.intake_year || '',
    
    // All students specific fields
    Career_Choice: item.Career_Choice || '',
    Semester: item.Semester || '',
    Class: item.Class || '',
    Batch: item.Batch || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.FirstName) newErrors.FirstName = 'First Name is required';
    if (!formData.LastName) newErrors.LastName = 'Last Name is required';
    if (!formData.Email) newErrors.Email = 'Email is required';
    if (!formData.StudentId) newErrors.StudentId = 'Student ID is required';
    if (!formData.Program) newErrors.Program = 'Program is required';

    // Email validation
    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = 'Invalid email format';
    }

    // Type-specific validations
    if (type === 'placement') {
      if (!formData.company_name) newErrors.company_name = 'Company name is required';
      if (!formData.position) newErrors.position = 'Position is required';
      if (!formData.package) newErrors.package = 'Package is required';
    }

    if (type === 'higherStudies') {
      if (!formData.university_name) newErrors.university_name = 'University name is required';
      if (!formData.course_name) newErrors.course_name = 'Course name is required';
      if (!formData.intake_year) newErrors.intake_year = 'Intake year is required';
    }

    if (type === 'all') {
      if (!formData.Semester) newErrors.Semester = 'Semester is required';
      if (!formData.Class) newErrors.Class = 'Class is required';
      if (!formData.Batch) newErrors.Batch = 'Batch is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`/api/students/${item.StudentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const updatedData = await response.json();
      onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student information');
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="mt-1 text-xs text-red-600">{errors[fieldName]}</p>
    ) : null;
  };

  const renderField = (name, label, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
          ${errors[name] ? 'border-red-300' : 'border-gray-300'}`}
      />
      {renderError(name)}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-6">
        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          {renderField("FirstName", "First Name")}
          {renderField("LastName", "Last Name")}
          {renderField("Email", "Email", "email")}
          {renderField("PhoneNo", "Phone Number", "tel")}
          {renderField("StudentId", "Student ID")}
          {renderField("Program", "Program")}
          {renderField("Enrollment_Year", "Enrollment Year")}
        </div>

        {/* Placement Fields */}
        {type === "placement" && (
          <div className="grid grid-cols-2 gap-4">
            {renderField("company_name", "Company Name")}
            {renderField("position", "Position")}
            {renderField("package", "Package (₹)", "number")}
            {renderField("Status", "Status")}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="Notes"
                value={formData.Notes}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {/* Higher Studies Fields */}
        {type === "higherStudies" && (
          <div className="grid grid-cols-2 gap-4">
            {renderField("university_name", "University Name")}
            {renderField("course_name", "Course Name")}
            {renderField("intake_year", "Intake Year")}
            {renderField("Status", "Status")}
          </div>
        )}

        {/* All Students Fields */}
        {type === "all" && (
          <div className="grid grid-cols-2 gap-4">
            {renderField("Career_Choice", "Career Choice")}
            {renderField("Semester", "Semester")}
            {renderField("Class", "Class")}
            {renderField("Batch", "Batch")}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentCard;