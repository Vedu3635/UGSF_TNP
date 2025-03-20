import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import StudentCard from "./StudentCard";

const PaginatedList = ({
  items,
  type,
  onStudentUpdate,
  onDelete,
  initialItemsPerPage = 25,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  // Track window resize to adjust responsive behavior
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically adjust items per page based on screen size
  useEffect(() => {
    if (windowWidth < 640) {
      // Mobile view - show fewer items
      setItemsPerPage(Math.min(initialItemsPerPage, 10));
    } else {
      setItemsPerPage(initialItemsPerPage);
    }
  }, [windowWidth, initialItemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
        {currentItems.map((item, index) => (
          <StudentCard
            key={index}
            item={item}
            type={type}
            onStudentUpdate={onStudentUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}{" "}
        items
      </div>
    </div>
  );
};

export default PaginatedList;
