import React, { useState } from 'react';
import { 
  Building2, AtSign, Phone, Globe, BookOpen, MapPin, FileText,
  IndianRupee, Briefcase, Code, Clock, Users, GraduationCap
} from 'lucide-react';
import axios from 'axios';

const FormField = ({ icon: Icon, label, name, type = "text", required = true, value, onChange, options = [], ...props }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon className="w-4 h-4 text-gray-500" />
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      />
    ) : type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'checkbox-group' ? (
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={onChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      />
    )}
  </div>
);

const CompanyRegistrationForm = ({ onSuccess }) => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    website: '',
    description: '',
    packageRangeMin: '',
    packageRangeMax: '',
    workModes: [],
    positions: '',
    experienceRequired: '',
    domains: [],
    hiringProcess: '',
    qualificationRequired: '',
    skillsRequired: '',
    benefitsOffered: '',
    recruitmentCycle: ''
  });

  const workModeOptions = [
    { value: 'onsite', label: 'On-site' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const domainOptions = [
    { value: 'sde', label: 'SDE' },
    { value: 'web', label: 'Web Dev' },
    { value: 'mobile', label: 'Mobile Dev' },
    { value: 'data', label: 'Data Science' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'qa', label: 'QA' },
    { value: 'design', label: 'Design' },
    { value: 'devops', label: 'DevOps' }
  ];

  const recruitmentCycleOptions = [
    { value: 'continuous', label: 'Continuous Hiring' },
    { value: 'scheduled', label: 'Scheduled Drive' },
    { value: 'seasonal', label: 'Seasonal Recruitment' }
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateWebsite = (website) => {
    if (!website) return true;
    try {
      new URL(website);
      return true;
    } catch {
      return false;
    }
  };

  const validatePackageRange = () => {
    const min = parseFloat(formData.packageRangeMin);
    const max = parseFloat(formData.packageRangeMax);
    return !isNaN(min) && !isNaN(max) && min <= max && min >= 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const arrayField = formData[name];
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...arrayField, value]
          : arrayField.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const validateForm = () => {
    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.industry.trim()) {
      setError('Industry is required');
      return false;
    }
    if (!validateWebsite(formData.website)) {
      setError('Please enter a valid website URL');
      return false;
    }
    if (!validatePackageRange()) {
      setError('Please enter valid package range');
      return false;
    }
    if (formData.workModes.length === 0) {
      setError('Please select at least one work mode');
      return false;
    }
    if (!formData.positions.trim()) {
      setError('Please specify available positions');
      return false;
    }
    if (formData.domains.length === 0) {
      setError('Please select at least one domain');
      return false;
    }
    if (!formData.hiringProcess.trim()) {
      setError('Please describe your hiring process');
      return false;
    }
    if (!formData.skillsRequired.trim()) {
      setError('Please specify required skills');
      return false;
    }
    if (!formData.qualificationRequired.trim()) {
      setError('Please specify required qualifications');
      return false;
    }
    if (!formData.recruitmentCycle) {
      setError('Please select a recruitment cycle');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/company/register', formData);
      if (response.data.success) {
        onSuccess?.();
      } else {
        setError('Failed to register company. Please try again.');
      }
    } catch (error) {
      console.error('Error registering company:', error);
      setError(error.response?.data?.message || 'An error occurred while registering the company.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Company Information */}
        <FormField
          icon={Building2}
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
        />
        
        <FormField
          icon={AtSign}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="company@example.com"
        />
        
        <FormField
          icon={Phone}
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
        />
        
        <FormField
          icon={BookOpen}
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g. Technology"
        />
        
        <FormField
          icon={Globe}
          label="Website"
          name="website"
          type="url"
          required={false}
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        {/* Job and Hiring Details */}
        <FormField
          icon={IndianRupee}
          label="Package Range (Min)"
          name="packageRangeMin"
          type="number"
          value={formData.packageRangeMin}
          onChange={handleChange}
          placeholder="Min package (LPA)"
          min="0"
          step="0.1"
        />

        <FormField
          icon={IndianRupee}
          label="Package Range (Max)"
          name="packageRangeMax"
          type="number"
          value={formData.packageRangeMax}
          onChange={handleChange}
          placeholder="Max package (LPA)"
          min="0"
          step="0.1"
        />

        <FormField
          icon={Clock}
          label="Work Modes"
          name="workModes"
          type="checkbox-group"
          value={formData.workModes}
          onChange={handleChange}
          options={workModeOptions}
        />

        <FormField
          icon={Briefcase}
          label="Available Positions"
          name="positions"
          value={formData.positions}
          onChange={handleChange}
          placeholder="e.g. SDE-I, Product Manager"
        />

        <FormField
          icon={Users}
          label="Experience Required"
          name="experienceRequired"
          value={formData.experienceRequired}
          onChange={handleChange}
          placeholder="e.g. 0-2 years, Freshers"
        />

        <FormField
          icon={Code}
          label="Domains"
          name="domains"
          type="checkbox-group"
          value={formData.domains}
          onChange={handleChange}
          options={domainOptions}
        />

        <FormField
          icon={GraduationCap}
          label="Qualification Required"
          name="qualificationRequired"
          value={formData.qualificationRequired}
          onChange={handleChange}
          placeholder="e.g. B.Tech, MCA"
        />

        <FormField
          icon={Briefcase}
          label="Recruitment Cycle"
          name="recruitmentCycle"
          type="select"
          value={formData.recruitmentCycle}
          onChange={handleChange}
          options={recruitmentCycleOptions}
        />
        
        <div className="md:col-span-2">
          <FormField
            icon={MapPin}
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete address"
          />
        </div>
        
        <div className="md:col-span-2">
          <FormField
            icon={FileText}
            label="Hiring Process"
            name="hiringProcess"
            type="textarea"
            required={true}
            value={formData.hiringProcess}
            onChange={handleChange}
            placeholder="Describe your hiring process (e.g., Online test, Technical rounds, HR round)..."
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            icon={FileText}
            label="Required Skills"
            name="skillsRequired"
            type="textarea"
            required={true}
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="List the required technical and soft skills..."
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            icon={FileText}
            label="Benefits Offered"
            name="benefitsOffered"
            type="textarea"
            required={false}
            value={formData.benefitsOffered}
            onChange={handleChange}
            placeholder="Describe employee benefits, perks, and growth opportunities..."
          />
        </div>
        
        <div className="md:col-span-2">
          <FormField
            icon={FileText}
            label="Company Description"
            name="description"
            type="textarea"
            required={false}
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your company..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:bg-indigo-400 disabled:cursor-not-allowed
                   flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⌛</span>
              Registering...
            </>
          ) : (
            'Register Company'
          )}
        </button>
      </div>
    </form>
  );
};

export default CompanyRegistrationForm;