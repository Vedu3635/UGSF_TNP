import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  ArrowUpRight,
  BookmarkPlus,
} from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      postedBy: "Alex Johnson (Class of 2015)",
      postedTime: "3 days ago",
      description:
        "We're looking for a frontend developer with strong React skills to join our team...",
      referralAvailable: true,
      skills: ["React", "JavaScript", "TypeScript", "CSS"],
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Netflix",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "2-4 years",
      postedBy: "Michelle Park (Class of 2018)",
      postedTime: "5 days ago",
      description:
        "Join our data science team to build recommendation systems...",
      referralAvailable: true,
      skills: ["Python", "Machine Learning", "SQL", "Data Analysis"],
    },
    {
      id: 3,
      title: "UX/UI Design Intern",
      company: "Spotify",
      location: "New York, NY",
      type: "Internship",
      experience: "Student/Recent Graduate",
      postedBy: "David Chang (Class of 2019)",
      postedTime: "1 week ago",
      description: "Summer internship opportunity for design students...",
      referralAvailable: false,
      skills: ["Figma", "UI Design", "Prototyping", "User Research"],
    },
    {
      id: 4,
      title: "Product Marketing Manager",
      company: "Adobe",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "5+ years",
      postedBy: "Sarah Williams (Class of 2014)",
      postedTime: "2 weeks ago",
      description:
        "Lead marketing initiatives for our Creative Cloud products...",
      referralAvailable: true,
      skills: [
        "Marketing Strategy",
        "Product Launches",
        "Market Research",
        "Content Creation",
      ],
    },
    {
      id: 5,
      title: "Backend Engineer",
      company: "Stripe",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      postedBy: "Michael Chen (Class of 2017)",
      postedTime: "3 days ago",
      description:
        "Help build our payment infrastructure using modern technologies...",
      referralAvailable: true,
      skills: ["Go", "Node.js", "Microservices", "Cloud"],
    },
  ]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    jobType: "all",
    location: "all",
    referralOnly: false,
  });

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter((job) => {
    // Search query filter
    if (
      filters.searchQuery &&
      !job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !job.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Job type filter
    if (filters.jobType !== "all" && job.type !== filters.jobType) {
      return false;
    }

    // Location filter
    if (filters.location !== "all" && job.location !== filters.location) {
      return false;
    }

    // Referral filter
    if (filters.referralOnly && !job.referralAvailable) {
      return false;
    }

    return true;
  });

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header - would be shared across pages */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">Alumni Portal</h1>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              JW
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Job & Internship Board
            </h1>
            <p className="text-gray-600 mt-1">
              Opportunities posted by alumni for the university community
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
            Post a Job Opportunity
          </button>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search jobs by title, company, or keywords"
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.jobType}
                  onChange={(e) =>
                    handleFilterChange("jobType", e.target.value)
                  }
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                >
                  <option value="all">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Seattle, WA">Seattle, WA</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="referral-only"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={filters.referralOnly}
                  onChange={(e) =>
                    handleFilterChange("referralOnly", e.target.checked)
                  }
                />
                <label
                  htmlFor="referral-only"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Referral Available
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Job listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Job info */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <button className="text-gray-400 hover:text-blue-600">
                        <BookmarkPlus className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-700 font-medium mt-1">
                      {job.company}
                    </p>

                    <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.postedTime}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      Posted by: {job.postedBy}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col justify-center space-y-3 min-w-max">
                    <button className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">
                      Apply Now
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    {job.referralAvailable && (
                      <button className="flex items-center justify-center gap-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition">
                        Request Referral
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                No jobs found matching your criteria
              </h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filters
              </p>
              <button
                className="mt-4 text-blue-600 font-medium"
                onClick={() =>
                  setFilters({
                    searchQuery: "",
                    jobType: "all",
                    location: "all",
                    referralOnly: false,
                  })
                }
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;
