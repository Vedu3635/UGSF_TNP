import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Globe,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Users,
  GraduationCap,
  Calendar,
  Building,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

const FormInput = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="relative">
    {/* Icon */}
    <div className="absolute left-3 top-3 text-purple-600">
      <Icon size={20} />
    </div>
    {/* Input Field */}
    <input
      type={type}
      id={props.name}
      {...props}
      className="w-full pl-11 pr-4 py-3 text-gray-700 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors peer placeholder:text-transparent"
      placeholder={label}
    />
    {/* Label */}
    <label
      htmlFor={props.name}
      className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-11 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-purple-500"
    >
      {label}
    </label>
  </div>
);

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-purple-500">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      <Icon size={24} className="text-purple-500" />
      <span>{title}</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const Select = ({ label, icon: Icon, options, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-3 text-purple-600">
      <Icon size={20} />
    </div>
    <select
      {...props}
      className="w-full pl-11 pr-10 py-3 text-gray-700 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
      value={props.value || ""}
      onChange={props.onChange}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600">
      {label}
    </label>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-purple-500">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

const CompanyRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    industry_domain: "",
    website_url: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    job_roles: "",
    positions: "",
    package_min: "",
    package_max: "",
    job_location: "",
    employment_type: "",
    eligibility_criteria: "",
    selection_rounds: "",
    hiring_date: "",
    mode_hiring: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    // Map form fields to match backend expectations
    const mappedData = {
      company_name: formData.company_name,
      industry_domain: formData.industry_domain,
      website_url: formData.website_url,
      contact_name: formData.contact_name,
      contact_email: formData.contact_email,
      contact_phone: formData.contact_phone,
      job_roles: formData.job_roles,
      positions: formData.positions,
      package_min: formData.package_min,
      package_max: formData.package_max,
      job_location: formData.job_location,
      employment_type: formData.employment_type,
      eligibility_criteria: formData.eligibility_criteria,
      selection_rounds: formData.selection_rounds,
      hiring_date: formData.hiring_date,
      mode_hiring: formData.mode_hiring,
    };

    try {
      const response = await fetch("http://localhost:5000/api/addcompanies", {
        method: "POST",
        body: JSON.stringify(mappedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // After successful registration
        alert("Company registration successful!");

        // Fetch updated company list to ensure data is fresh
        const companiesResponse = await fetch(
          "http://localhost:5000/api/companies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (companiesResponse.ok) {
          // Navigate to the company list page
          navigate("/");
        } else {
          console.error("Failed to fetch updated companies");
        }
      } else {
        alert("Failed to register the company. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
          <Building2 size={40} className="text-purple-600" />
          Company Registration
        </h1>
      </div>

      <FormSection title="General Information" icon={Building}>
        <FormInput
          label="Company Name"
          icon={Building2}
          name="company_name"
          value={formData.company_name}
          onChange={handleInputChange}
          required
        />

        <FormInput
          label="Industry Domain"
          icon={Briefcase}
          name="industry_domain"
          value={formData.industry_domain}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Website URL"
          icon={Globe}
          name="website_url"
          type="url"
          value={formData.website_url}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Contact Person Name"
          icon={User}
          name="contact_name"
          value={formData.contact_name}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Contact Email"
          icon={Mail}
          name="contact_email"
          type="email"
          value={formData.contact_email}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Contact Phone"
          icon={Phone}
          name="contact_phone"
          type="tel"
          value={formData.contact_phone}
          onChange={handleInputChange}
          required
        />
        {/* <div className="relative">
          <label className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 z-10">
            Company Logo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-purple-200 border-dashed rounded-lg hover:border-purple-500 transition-colors bg-white">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-purple-500" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    name="logo"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div> */}
      </FormSection>

      <FormSection title="Placement Details" icon={Briefcase}>
        <FormInput
          label="Job Roles"
          icon={Briefcase}
          name="job_roles"
          value={formData.job_roles}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Number of Positions"
          icon={Users}
          name="positions"
          type="number"
          min="1"
          value={formData.positions}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Minimum Salary"
          icon={DollarSign}
          name="package_min"
          type="number"
          min="0"
          value={formData.package_min}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Maximum Salary"
          icon={DollarSign}
          name="package_max"
          type="number"
          min="0"
          value={formData.package_max}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Job Location"
          icon={MapPin}
          name="job_location"
          value={formData.job_location}
          onChange={handleInputChange}
          required
        />
        <Select
          label="Employment Type"
          icon={Briefcase}
          name="employment_type"
          value={formData.employment_type}
          onChange={handleInputChange}
          options={[
            { value: "internship", label: "Internship" },
            { value: "fulltime", label: "Full Time" },
            { value: "both", label: "Both" },
          ]}
          required
        />
        <FormInput
          label="Eligibility Criteria"
          icon={GraduationCap}
          name="eligibility_criteria"
          value={formData.eligibility_criteria}
          onChange={handleInputChange}
          required
        />
      </FormSection>

      <FormSection title="Hiring Process" icon={CheckCircle2}>
        <FormInput
          label="Selection Rounds"
          icon={CheckCircle2}
          name="selection_rounds"
          value={formData.selection_rounds}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Preferred Drive Dates"
          icon={Calendar}
          name="hiring_date"
          type="date"
          value={formData.hiring_date}
          onChange={handleInputChange}
          required
        />
        <Select
          label="Mode of Hiring"
          icon={Building2}
          name="mode_hiring"
          value={formData.mode_hiring}
          onChange={handleInputChange}
          options={[
            { value: "online", label: "Online" },
            { value: "offline", label: "Offline" },
            { value: "hybrid", label: "Hybrid" },
          ]}
          required
        />
      </FormSection>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all hover:scale-105 flex items-center gap-2"
        >
          Submit Registration
          <CheckCircle2
            size={20}
            className="transform group-hover:rotate-12 transition-transform"
          />
        </button>
      </div>
    </form>
  );
};

export default CompanyRegistrationForm;
