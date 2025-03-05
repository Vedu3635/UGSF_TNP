import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabTrigger, TabContent } from "./CompanyTabs";
import CompanyCard from "./CompanyCard";
import { Pencil, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import CompanyUpdateForm from "./CompanyUpdateForm";
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
    visited: companiesData ? [] : [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [formData, setFormData] = useState({
    company_id: "",
    company_name: "",
    industry_domain: "",
    website_url: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    job_roles: "",
    positions: "",
    package_min: "",
    package_max: "",
    employment_type: "",
    eligibility_criteria: "",
    selection_rounds: "",
    hiring_date: "",
    mode_hiring: "",
  });

  useEffect(() => {
    if (companiesData) {
      setCompanies(divideCompaniesByDate(companiesData));
      setIsLoading(false);
    }
  }, [companiesData]);

  const divideCompaniesByDate = (data) => {
    const currentDate = new Date();
    return data.reduce(
      (acc, company) => {
        const hiringDate = new Date(company.hiring_date);
        hiringDate >= currentDate
          ? acc.upcoming.push(company)
          : acc.visited.push(company);
        return acc;
      },
      { upcoming: [], visited: [] }
    );
  };

  const fetchUpdatedCompanies = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/companies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch updated companies");
      setCompanies(divideCompaniesByDate(await response.json()));
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
    setFormData({ ...company });
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete?.company_id) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete-company/${companyToDelete.company_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete company");
      await fetchUpdatedCompanies();
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
        `http://localhost:5000/api/edit-company/${selectedCompany.company_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update company");
      await fetchUpdatedCompanies();
      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  //Update button

  const ActionButtons = ({ company }) => {
    let userRole = "";
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.user.role || "";
      } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
      }
    }

    if (userRole === "tnpfaculty") {
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
          <CompanyUpdateForm
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
                {companyToDelete?.company_name}
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
