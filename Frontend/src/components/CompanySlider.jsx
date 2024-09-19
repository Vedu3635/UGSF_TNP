import React from 'react';
import { ChevronRight } from 'lucide-react';

const CompanySlider = () => {
  const companies = [
    {
      logo: "TCS",
      name: "Tata Consultancy Service",
      role: "Full stack developer",
      positions: 2,
      type: "Full Time",
      lpa: 10
    },
    {
      logo: "TCS",
      name: "Tata Consultancy Service",
      role: "Full stack developer",
      positions: 2,
      type: "Full Time",
      lpa: 10
    },
    {
      logo: "TCS",
      name: "Tata Consultancy Service",
      role: "Full stack developer",
      positions: 2,
      type: "Full Time",
      lpa: 10
    },
    {
      logo: "TCS",
      name: "Tata Consultancy Service",
      role: "Full stack developer",
      positions: 2,
      type: "Full Time",
      lpa: 10
    },
    
    // Add more companies here if needed
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 p-4">
        {companies.map((company, index) => (
          <div key={index} className="flex-shrink-0 w-64 bg-white shadow-md rounded-3xl overflow-hidden">
            <div className="p-3">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">{company.logo}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">{company.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{company.positions} Positions</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{company.type}</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{company.lpa} LPA</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySlider;