import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  IndianRupee,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentCard = ({ item, type }) => {
  const [expanded, setExpanded] = useState(false);
  // console.log(item);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl mb-4">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-3">
          {type === "placement" ? (
            <Briefcase className="w-5 h-5 text-blue-600" />
          ) : (
            <GraduationCap className="w-5 h-5 text-green-600" />
          )}
          <div>
            <h4 className="font-bold text-sm md:text-base text-gray-800">
              {item.FirstName} {item.LastName}
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              {type === "placement" ? item.position : item.program}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>
      {expanded && (
        <div className="px-4 pb-4">
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            <p className="text-xs md:text-sm text-gray-700">
              <strong>
                {type === "placement" ? "Company:" : "University:"}
              </strong>{" "}
              {type === "placement" ? item.company_name : item.university_name}
            </p>
            <p className="text-xs md:text-sm text-gray-700 mt-1 flex items-center">
              <strong className="mr-1">
                {type === "placement" ? "Salary:" : "Year:"}
              </strong>

              {type === "placement" ? (
                <IndianRupee className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <CalendarDays className="w-3 h-3 text-blue-500 mr-1" />
              )}
              {type === "placement" ? item.package : item.intake_year}
            </p>
          </div>
          <a
            href="#"
            className="mt-3 text-xs md:text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200 inline-flex items-center"
          >
            Learn more <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-200"
  >
    {children}
  </button>
);

const PaginatedList = ({ items, type, initialItemsPerPage = 25 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-2 rounded-md ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      <div className="space-y-4 mb-4">
        {currentItems.map((item, index) => (
          <StudentCard key={index} item={item} type={type} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </PaginationButton>
          {renderPageNumbers()}
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </PaginationButton>
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded-md"
        >
          {[25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}{" "}
        items
      </div>
    </div>
  );
};

const StudentList = ({ placementData, higherStudiesData }) => {
  const [activeTab, setActiveTab] = useState("placements");

  const lists = {
    placements: placementData,
    higherStudies: higherStudiesData,
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-lg">
      {/* Tabs for switching between placements and higher studies */}
      <div className="flex justify-center space-x-4 mb-6">
        {["placements", "higherStudies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? `bg-${tab === "placements" ? "blue" : "green"}-500 text-white`
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab === "placements" ? (
              <Briefcase className="w-5 h-5 inline-block mr-2" />
            ) : (
              <GraduationCap className="w-5 h-5 inline-block mr-2" />
            )}
            {tab === "placements" ? "Placements" : "Higher Studies"}
          </button>
        ))}
      </div>

      {/* Header for the active tab */}
      <h2
        className={`text-2xl font-bold mb-4 text-${
          activeTab === "placements" ? "blue" : "green"
        }-700 flex items-center justify-center`}
      >
        {activeTab === "placements" ? (
          <Briefcase className="w-6 h-6 mr-2" />
        ) : (
          <GraduationCap className="w-6 h-6 mr-2" />
        )}
        {activeTab === "placements" ? "Placements" : "Higher Studies"}
      </h2>

      {/* Paginated list for the active tab data */}
      <PaginatedList
        items={lists[activeTab]}
        type={activeTab === "placements" ? "placement" : "higherStudies"}
      />
    </div>
  );
};

export default StudentList;
