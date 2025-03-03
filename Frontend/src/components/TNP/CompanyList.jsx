import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabTrigger, TabContent } from "./CompanyTabs";
import CompanyCard from "./CompanyCard";
import { Pencil } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 bg-white rounded-3xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const CompanyList = ({ companiesData }) => {
  // console.log(companiesData);
  const [companies, setCompanies] = useState({ upcoming: [], visited: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    Id: "",
    Company_Name: "",
    Industry_Domain: "",
    Website_URL: "",
    Contact_Name: "",
    Contact_Email: "",
    Contact_Phone: "",
    Job_Roles: "",
    Positions: "",
    Package_Min: "",
    Package_Max: "",
    Employment_Type: "",
    Eligibility_Criteria: "",
    Selection_Rounds: "",
    Hiring_Date: "",
    Mode_Hiring: "",
  });

  useEffect(() => {
    if (companiesData) {
      

      const currentDate = new Date();
      const dividedData = companiesData.reduce(
        (acc, company) => {
          const hiringDate = new Date(company.hiring_date);
   

          if (hiringDate >= currentDate) {
            acc.upcoming.push(company);
          } else {
            acc.visited.push(company);
          }
          return acc;
        },
        { upcoming: [], visited: [] }
      );

      

      setCompanies(dividedData);
      setIsLoading(false);
    }
  }, [companiesData]);

  // console.log(companies);
  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
    setFormData({
      Id: company.Id,
      Company_Name: company.Company_Name,
      Industry_Domain: company.Industry_Domain,
      Website_URL: company.Website_URL,
      Contact_Name: company.Contact_Name,
      Contact_Email: company.Contact_Email,
      Contact_Phone: company.Contact_Phone,
      Job_Roles: company.Job_Roles,
      Positions: company.Positions,
      Package_Min: company.Package_Min,
      Package_Max: company.Package_Max,
      Employment_Type: company.Employment_Type,
      Eligibility_Criteria: company.Eligibility_Criteria,
      Selection_Rounds: company.Selection_Rounds,
      Hiring_Date: company.Hiring_Date,
      Mode_Hiring: company.Mode_Hiring,
    });
    setIsUpdateDialogOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/edit-company/${selectedCompany.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update company");
      }

      // After successful update, fetch fresh data
      const companiesResponse = await fetch(
        "http://localhost:5000/api/companies",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!companiesResponse.ok) {
        throw new Error("Failed to fetch updated companies");
      }

      const freshCompaniesData = await companiesResponse.json();

      // Update the companies state with fresh data
      const currentDate = new Date();
      const dividedData = freshCompaniesData.reduce(
        (acc, company) => {
          const hiringDate = new Date(company.Hiring_Date);
          if (hiringDate >= currentDate) {
            acc.upcoming.push(company);
          } else {
            acc.visited.push(company);
          }
          return acc;
        },
        { upcoming: [], visited: [] }
      );

      setCompanies(dividedData);
      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const UpdateButton = ({ onClick }) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    let userRole = "";

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.user.role || ""; // Assuming the token contains a `role` field
      } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
      }
    }

    if (userRole === "tnpfaculty") {
      return (
        <button
          onClick={onClick}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-700 text-sm font-medium transition-all duration-300 hover:shadow-md"
        >
          <Pencil className="w-4 h-4" />
          Update
        </button>
      );
    }

    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return ""; // Return an empty string or a default value
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formData.Hiring_Date
    ? formatDate(formData.Hiring_Date)
    : "";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-pulse w-16 h-16 bg-blue-200 rounded-full"></div>
        <p className="text-gray-600 animate-pulse">
          Loading placement insights...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Placement Insights
        </h1>

        <Tabs defaultTab="upcoming">
          <TabList>
            <TabTrigger value="upcoming">Upcoming Companies</TabTrigger>
            <TabTrigger value="visited">Visited Companies</TabTrigger>
          </TabList>

          <TabContent value="upcoming">
            <div className="space-y-6">
              {companies.upcoming.length > 0 ? (
                companies.upcoming.map((company, index) => (
                  <div key={index} className="relative">
                    <CompanyCard company={company} type="upcoming" />
                    <UpdateButton onClick={() => handleUpdateClick(company)} />
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <p className="text-center text-blue-600">
                    No upcoming placement drives at the moment
                  </p>
                </div>
              )}
            </div>
          </TabContent>

          <TabContent value="visited">
            <div className="space-y-6">
              {companies.visited.length > 0 ? (
                companies.visited.map((company, index) => (
                  <div key={index} className="relative">
                    <CompanyCard company={company} type="visited" />
                    <UpdateButton onClick={() => handleUpdateClick(company)} />
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <p className="text-center text-green-600">
                    No companies visited this year
                  </p>
                </div>
              )}
            </div>
          </TabContent>
        </Tabs>

        <Dialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Update Company Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    name="Company_Name"
                    value={formData.Company_Name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Domain
                  </label>
                  <input
                    name="Industry_Domain"
                    value={formData.Industry_Domain}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    name="Website_URL"
                    value={formData.Website_URL}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    name="Contact_Name"
                    value={formData.Contact_Name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    name="Contact_Email"
                    type="email"
                    value={formData.Contact_Email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    name="Contact_Phone"
                    type="tel"
                    value={formData.Contact_Phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Job Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Roles
                  </label>
                  <input
                    name="Job_Roles"
                    value={formData.Job_Roles}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Positions
                  </label>
                  <input
                    name="Positions"
                    type="number"
                    value={formData.Positions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Package Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Package (LPA)
                  </label>
                  <input
                    name="Package_Min"
                    type="number"
                    value={formData.Package_Min}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Package (LPA)
                  </label>
                  <input
                    name="Package_Max"
                    type="number"
                    value={formData.Package_Max}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type
                  </label>
                  <input
                    name="Employment_Type"
                    value={formData.Employment_Type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Eligibility Criteria
                  </label>
                  <input
                    name="Eligibility_Criteria"
                    value={formData.Eligibility_Criteria}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selection Rounds
                  </label>
                  <input
                    name="Selection_Rounds"
                    type="text"
                    value={formData.Selection_Rounds}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mode of Hiring
                  </label>
                  <input
                    name="Mode_Hiring"
                    type="text"
                    value={formData.Mode_Hiring}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hiring Date
                  </label>
                  <input
                    name="Hiring_Date"
                    type="date"
                    value={formattedDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsUpdateDialogOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                >
                  Update Company
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CompanyList;
