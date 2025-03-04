import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabTrigger, TabContent } from "./CompanyTabs";
import CompanyCard from "./CompanyCard";
import { Pencil, Trash2 } from "lucide-react";
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
  const [companies, setCompanies] = useState({ 
    upcoming: companiesData ? [] : [], 
    visited: companiesData ? [] : [] 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
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
      setIsLoading(false);
    }
  }, [companiesData]);

  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
    setFormData({
      Id: company.Id || "",
      Company_Name: company.Company_Name || "",
      Industry_Domain: company.Industry_Domain || "",
      Website_URL: company.Website_URL || "",
      Contact_Name: company.Contact_Name || "",
      Contact_Email: company.Contact_Email || "",
      Contact_Phone: company.Contact_Phone || "",
      Job_Roles: company.Job_Roles || "",
      Positions: company.Positions || "",
      Package_Min: company.Package_Min || "",
      Package_Max: company.Package_Max || "",
      Employment_Type: company.Employment_Type || "",
      Eligibility_Criteria: company.Eligibility_Criteria || "",
      Selection_Rounds: company.Selection_Rounds || "",
      Hiring_Date: company.Hiring_Date || "",
      Mode_Hiring: company.Mode_Hiring || "",
    });
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete?.Id) return;
    
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete-company/${companyToDelete.Id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete company");
      }

      // After successful deletion, fetch fresh data
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
      setIsDeleteDialogOpen(false);
      setCompanyToDelete(null);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
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

  //Update button
  const UpdateForm = ({ formData, handleChange, handleSubmit, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Blurred background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
        
        {/* Modal content with increased width */}
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 overflow-auto max-h-[90vh]">
          <div className="p-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-gray-800">Update Company Information</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-8">Make changes to company details below</p>
      
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="Company_Name"
                        value={formData.Company_Name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Industry Domain</label>
                      <input
                        type="text"
                        name="Industry_Domain"
                        value={formData.Industry_Domain}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Website URL</label>
                      <input
                        type="url"
                        name="Website_URL"
                        value={formData.Website_URL}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
      
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Contact Name</label>
                      <input
                        type="text"
                        name="Contact_Name"
                        value={formData.Contact_Name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        name="Contact_Email"
                        value={formData.Contact_Email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        name="Contact_Phone"
                        value={formData.Contact_Phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
      
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Job Roles</label>
                      <input
                        type="text"
                        name="Job_Roles"
                        value={formData.Job_Roles}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Positions Available</label>
                      <input
                        type="number"
                        name="Positions"
                        value={formData.Positions}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Minimum Package (LPA)</label>
                      <input
                        type="number"
                        name="Package_Min"
                        value={formData.Package_Min}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Maximum Package (LPA)</label>
                      <input
                        type="number"
                        name="Package_Max"
                        value={formData.Package_Max}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Employment Type</label>
                      <select
                        name="Employment_Type"
                        value={formData.Employment_Type}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>
                </div>
      
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Eligibility Criteria</label>
                      <textarea
                        name="Eligibility_Criteria"
                        value={formData.Eligibility_Criteria}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Selection Rounds</label>
                      <textarea
                        name="Selection_Rounds"
                        value={formData.Selection_Rounds}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Hiring Date</label>
                      <input
                        type="date"
                        name="Hiring_Date"
                        value={formData.Hiring_Date}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Mode of Hiring</label>
                      <select
                        name="Mode_Hiring"
                        value={formData.Mode_Hiring}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
      
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };


  const ActionButtons = ({ company }) => {
    const token = localStorage.getItem("token");
    let userRole = "";

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.user.role || "";
      } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
      }
    }

    if (userRole === "ADMIN") {
      return (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => handleUpdateClick(company)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-700 text-sm font-medium transition-all duration-300 hover:shadow-md"
          >
            <Pencil className="w-4 h-4" />
            Update
          </button>
          <button
            onClick={() => handleDeleteClick(company)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50/80 backdrop-blur-sm hover:bg-red-50 border border-red-200 text-red-600 text-sm font-medium transition-all duration-300 hover:shadow-md"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-pulse w-16 h-16 bg-blue-200 rounded-full"></div>
        <p className="text-gray-600 animate-pulse">Loading placement insights...</p>
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
                    <ActionButtons company={company} />
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
                    <ActionButtons company={company} />
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

        {/* Update Dialog */}
        <Dialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        >
          <UpdateForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={() => setIsUpdateDialogOpen(false)}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {companyToDelete?.Company_Name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
              >
                Delete Company
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CompanyList;