import React, { useState } from 'react';
import { ChevronDown, ChevronUp, List, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentListManagement = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <label
          htmlFor="table-select"
          className="text-sm font-medium text-white"
        >
          Student List:
        </label>
      <button 
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center bg-gray-600 hover:bg-gray-500 p-2 rounded mt-2"
      >
        Student List
        {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white text-black shadow-lg rounded mt-1">
          <div className="p-2">
            <Link 
              to="/view-students"
              className="w-full flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded mb-2"
            >
              <List size={18} className="mr-2" /> View Student List
            </Link>
            
            <Link 
              to="/manage-students"
              className="w-full flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded"
            >
              <Settings size={18} className="mr-2" /> Manage Student List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListManagement;