import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const CompanyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
        <label
          htmlFor="table-select"
          className="text-sm font-medium text-white"
        >
          Company:
        </label>

      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition-colors duration-200 mt-2"
      >
        <span>Company</span>
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white divide-y divide-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden">
          <ul className="py-1 text-blue-700">
            <li>
              <Link
                to="/register-company"
                className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Register Company
              </Link>
            </li>
            <li>
              <Link
                to="/manage-company"
                className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Manage Company
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;