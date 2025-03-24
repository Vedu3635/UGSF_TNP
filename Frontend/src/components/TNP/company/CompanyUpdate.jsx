import React from "react";
import { format, parse, isValid, parseISO } from "date-fns";

const CompanyUpdate = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  selectedCompany,
}) => {
  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      let apiFormData = { ...formData };
      if (formData.hiring_date) {
        let parsedDate;
        const possibleFormats = [
          "dd-MM-yyyy",
          "yyyy-MM-dd",
          "dd/MM/yyyy",
          "yyyy/MM/dd",
        ];

        for (const formatString of possibleFormats) {
          try {
            parsedDate = parse(formData.hiring_date, formatString, new Date());
            if (isValid(parsedDate)) break;
          } catch (error) {
            continue;
          }
        }

        if (!isValid(parsedDate)) {
          parsedDate = parseISO(formData.hiring_date);
        }

        if (!isValid(parsedDate)) {
          console.error("Invalid date format:", formData.hiring_date);
          return;
        }

        apiFormData.hiring_date = format(parsedDate, "yyyy-MM-dd");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/edit-company/${
          selectedCompany.company_id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiFormData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update company: ${errorText}`);
      }

      handleSubmit(apiFormData);
      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 bg-white rounded-3xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Update Company Details
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          {/* Add other form fields as needed */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyUpdate;
