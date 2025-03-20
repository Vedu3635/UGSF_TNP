import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-2 py-1 sm:px-3 sm:py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
  >
    {children}
  </button>
);

const PaginationCompany = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; // Fewer pages on mobile
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
        onClick={() => onPageChange(page)}
        className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base ${
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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      {totalPages > 1 && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </PaginationButton>
          {renderPageNumbers()}
          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </PaginationButton>
        </div>
      )}
      <div className="flex items-center">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm sm:text-base"
        >
          {[5, 10, 25].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
        <span className="ml-2 text-sm text-gray-600">
          (Showing {Math.min(itemsPerPage, totalItems)} of {totalItems})
        </span>
      </div>
    </div>
  );
};

export default PaginationCompany;
