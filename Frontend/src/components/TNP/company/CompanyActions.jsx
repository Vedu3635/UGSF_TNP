import React from "react";
import { jwtDecode } from "jwt-decode";

const CompanyActions = ({
  company,
  onUpdateClick,
  onDeleteClick,
  onDetailsClick,
}) => {
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

  if (userRole !== "tnpfaculty") return null;

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={() => onDetailsClick(company)}
        className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
      >
        More Details
      </button>
      <button
        onClick={() => onUpdateClick(company)}
        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
      >
        Update
      </button>
      <button
        onClick={() => onDeleteClick(company)}
        className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default CompanyActions;
