import React from "react";

const JobBoard = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "TechCorp",
      location: "San Francisco, CA",
      poster: "Alex Chen (Class of 2015)",
      tags: ["Product", "5+ Years", "Full-time"],
    },
    {
      id: 2,
      title: "Business Analyst Intern",
      company: "FinanceGroup",
      location: "New York, NY",
      poster: "Maria Davis (Class of 2018)",
      tags: ["Finance", "Entry Level", "Internship"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "HealthTech",
      location: "Remote",
      poster: "James Wilson (Class of 2019)",
      tags: ["Design", "2+ Years", "Remote"],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Job Opportunities</h2>
        <div className="flex gap-2">
          <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            View All
          </button>
          <button className="text-sm px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            Post a Job
          </button>
        </div>
      </div>

      <div className="p-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
          >
            <div className="bg-gray-100 rounded-lg min-w-12 h-12 flex items-center justify-center">
              <img
                src={`/api/placeholder/48/48`}
                alt={job.company}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{job.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {job.company} • {job.location} • Posted by {job.poster}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
