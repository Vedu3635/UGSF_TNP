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

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    // On mobile, show fewer page numbers
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="px-2 py-1 border rounded-md text-sm sm:text-base"
      >
        {[25, 50, 100].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
