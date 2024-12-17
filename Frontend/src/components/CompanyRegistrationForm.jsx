import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Briefcase 
} from 'lucide-react';

const CompanyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    domain: '',
    position: '',
    company_name: '',
    minimum_package: '',
    maximum_package: '',
    hiring_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <h2 className="text-2xl font-semibold">Company Registration</h2>
          <p className="text-blue-100 mt-2">Enter your company details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Domain */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Company Domain"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Position */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Job Position"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Hiring Date */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="text-gray-400" size={20} />
              </div>
              <input
                type="date"
                name="hiring_date"
                value={formData.hiring_date}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Minimum Package */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="text-gray-400" size={20} />
              </div>
              <input
                type="number"
                name="minimum_package"
                value={formData.minimum_package}
                onChange={handleChange}
                placeholder="Minimum Package"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Maximum Package */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="text-gray-400" size={20} />
              </div>
              <input
                type="number"
                name="maximum_package"
                value={formData.maximum_package}
                onChange={handleChange}
                placeholder="Maximum Package"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors duration-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;