import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const CompanyActions = ({ company, onUpdateClick, onDeleteClick }) => {
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
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <button
        onClick={() => onUpdateClick(company)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-700 text-sm font-medium transition-all duration-300 hover:shadow-md"
      >
        <Pencil className="w-4 h-4" />
        Update
      </button>
      <button
        onClick={() => onDeleteClick(company)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50/80 backdrop-blur-sm hover:bg-red-50 border border-red-200 text-red-600 text-sm font-medium transition-all duration-300 hover:shadow-md"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
};

export default CompanyActions;
