import React, { useState, useEffect } from "react";
import { format, parseISO, parse, isValid } from "date-fns";
import CompanyFilter from "./CompanyFilter";
import CompanyUpdateForm from "./CompanyUpdateForm";
import CompanyTabContent from "./CompanyTabContent";
import CompanyDelete from "./CompanyDelete";
import CompanyDetailsModal from "./CompanyDetailsModal";
import { Tabs, TabList, TabTrigger, TabContent } from "./CompanyTabs";

const CompanyList = ({ companiesData }) => {
  const [companies, setCompanies] = useState({
    upcoming: [],
    visited: [],
  });
  const [filteredCompanies, setFilteredCompanies] = useState({
    upcoming: [],
    visited: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [companyToView, setCompanyToView] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (companiesData) {
      const dividedCompanies = divideCompaniesByDate(companiesData);
      setCompanies(dividedCompanies);
      setFilteredCompanies(dividedCompanies);
      setIsLoading(false);
      setCurrentPage(1);
    }
  }, [companiesData]);

  const divideCompaniesByDate = (data) => {
    const currentDate = new Date();
    const sortedData = data.sort(
      (b, a) => new Date(b.hiring_date) - new Date(a.hiring_date)
    );
    return sortedData.reduce(
      (acc, company) => {
        const hiringDate = company.hiring_date
          ? parseISO(company.hiring_date)
          : new Date();
        hiringDate >= currentDate
          ? acc.upcoming.push(company)
          : acc.visited.push(company);
        return acc;
      },
      { upcoming: [], visited: [] }
    );
  };

  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
    const safeCompany = Object.fromEntries(
      Object.entries(company).map(([key, value]) => [
        key,
        value === null || value === undefined ? "" : value,
      ])
    );
    const formattedDate = safeCompany.hiring_date
      ? format(parseISO(safeCompany.hiring_date), "dd-MM-yyyy")
      : "";
    setFormData({
      ...safeCompany,
      hiring_date: formattedDate,
    });
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const handleDetailsClick = (company) => {
    setCompanyToView(company);
    setIsDetailsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? "",
    });
  };

  const handleSubmit = async (e) => {
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
      await fetchUpdatedCompanies();
      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const fetchUpdatedCompanies = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/companies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch updated companies");
      const dividedCompanies = divideCompaniesByDate(await response.json());
      setCompanies(dividedCompanies);
      setFilteredCompanies(dividedCompanies);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete?.company_id) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete-company/${
          companyToDelete.company_id
        }`,
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

  const handleFilterChange = (filters) => {
    const filtered = {
      upcoming: companies.upcoming.filter((company) =>
        filterCompany(company, filters)
      ),
      visited: companies.visited.filter((company) =>
        filterCompany(company, filters)
      ),
    };
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const filterCompany = (company, filters) => {
    if (
      filters.industry &&
      !company.industry_domain
        .toLowerCase()
        .includes(filters.industry.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.companyName &&
      !company.company_name
        .toLowerCase()
        .includes(filters.companyName.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.jobRole &&
      !company.job_roles.toLowerCase().includes(filters.jobRole.toLowerCase())
    ) {
      return false;
    }
    if (filters.hiringDate) {
      const filterDate = new Date(filters.hiringDate);
      const companyDate = parseISO(company.hiring_date);
      if (
        format(filterDate, "yyyy-MM-dd") !== format(companyDate, "yyyy-MM-dd")
      ) {
        return false;
      }
    }
    return true;
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
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

        <CompanyFilter onFilterChange={handleFilterChange} />

        <Tabs defaultTab="upcoming" onTabChange={(tab) => setActiveTab(tab)}>
          <TabList>
            <TabTrigger value="upcoming">Upcoming Companies</TabTrigger>
            <TabTrigger value="visited">Visited Companies</TabTrigger>
          </TabList>

          <TabContent value="upcoming">
            <CompanyTabContent
              companies={filteredCompanies.upcoming}
              type="upcoming"
              onFilterEmptyMessage={(length) =>
                length > 0
                  ? "No companies match your filter criteria"
                  : "No upcoming placement drives at the moment"
              }
              totalItems={filteredCompanies.upcoming.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              onUpdateClick={handleUpdateClick}
              onDeleteClick={handleDeleteClick}
              onDetailsClick={handleDetailsClick}
            />
          </TabContent>

          <TabContent value="visited">
            <CompanyTabContent
              companies={filteredCompanies.visited}
              type="visited"
              onFilterEmptyMessage={(length) =>
                length > 0
                  ? "No companies match your filter criteria"
                  : "No companies visited this year"
              }
              totalItems={filteredCompanies.visited.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              onUpdateClick={handleUpdateClick}
              onDeleteClick={handleDeleteClick}
              onDetailsClick={handleDetailsClick}
            />
          </TabContent>
        </Tabs>

        {isUpdateDialogOpen && (
          <CompanyUpdateForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={() => setIsUpdateDialogOpen(false)}
          />
        )}

        <CompanyDelete
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          companyToDelete={companyToDelete}
          onDeleteConfirm={handleDeleteConfirm}
        />

        {isDetailsModalOpen && companyToView && (
          <CompanyDetailsModal
            company={companyToView}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setCompanyToView(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyList;
