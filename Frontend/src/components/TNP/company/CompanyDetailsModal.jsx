import React from "react";
import { format, parseISO, isValid } from "date-fns";

const CompanyDetailsModal = ({ company, onClose }) => {
  // Format date for display if valid
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "dd MMMM yyyy") : dateString;
    } catch (error) {
      return dateString;
    }
  };

  // Format fields for display
  const formatField = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Not specified";
    }
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {company.company_name} - Company Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-3">
                Company Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Company Name:</span>{" "}
                  {formatField(company.company_name)}
                </p>
                <p>
                  <span className="font-medium">Industry Domain:</span>{" "}
                  {formatField(company.industry_domain)}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  {company.website_url ? (
                    <a
                      href={company.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {company.website_url}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Contact Name:</span>{" "}
                  {formatField(company.contact_name)}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {formatField(company.contact_email)}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {formatField(company.contact_phone)}
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-3">Job Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Job Roles:</span>{" "}
                  {formatField(company.job_roles)}
                </p>
                <p>
                  <span className="font-medium">Positions:</span>{" "}
                  {formatField(company.positions)}
                </p>
                <p>
                  <span className="font-medium">Package Range:</span>{" "}
                  {company.package_min || company.package_max
                    ? `${formatField(company.package_min)} - ${formatField(
                        company.package_max
                      )}`
                    : "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Job Location:</span>{" "}
                  {formatField(company.job_location)}
                </p>
                <p>
                  <span className="font-medium">Employment Type:</span>{" "}
                  {formatField(company.employment_type)}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-700 mb-3">
                Hiring Process
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Eligibility Criteria:</span>{" "}
                  {formatField(company.eligibility_criteria)}
                </p>
                <p>
                  <span className="font-medium">Selection Rounds:</span>{" "}
                  {formatField(company.selection_rounds)}
                </p>
                <p>
                  <span className="font-medium">Hiring Date:</span>{" "}
                  {formatDate(company.hiring_date)}
                </p>
                <p>
                  <span className="font-medium">Mode of Hiring:</span>{" "}
                  {formatField(company.mode_hiring)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;
