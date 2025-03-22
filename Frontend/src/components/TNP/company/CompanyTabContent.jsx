import React from "react";
import CompanyCard from "./CompanyCard";
import CompanyActions from "./CompanyActions";
import PaginationCompany from "./PaginationCompany";

const CompanyTabContent = ({
  companies,
  type,
  onFilterEmptyMessage,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onUpdateClick,
  onDeleteClick,
}) => {
  const paginateCompanies = (list) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return list.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="space-y-6">
        {paginateCompanies(companies).length > 0 ? (
          paginateCompanies(companies).map((company, index) => (
            <div key={index} className="relative">
              <CompanyCard company={company} type={type} />
              <CompanyActions
                company={company}
                onUpdateClick={onUpdateClick}
                onDeleteClick={onDeleteClick}
              />
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <p
              className={`text-center ${
                type === "upcoming" ? "text-blue-600" : "text-green-600"
              }`}
            >
              {onFilterEmptyMessage(companies.length)}
            </p>
          </div>
        )}
      </div>
      <PaginationCompany
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </>
  );
};

export default CompanyTabContent;
