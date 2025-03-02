import React, { useState } from "react";
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

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="space-y-4 mb-4">
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
      <div className="mt-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}{" "}
        items
      </div>
    </div>
  );
};

export default PaginatedList;
