import React from "react";

const AlumniProfile = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">My Profile</h2>
        <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
          Edit
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold mt-4">Sarah Johnson</h3>
          <p className="text-sm text-gray-500">
            Product Marketing Manager at TechCorp
          </p>

          <div className="w-full mt-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Education</h4>
              <p className="text-sm text-gray-700">
                B.S. Business Administration, Class of 2020
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Location</h4>
              <p className="text-sm text-gray-700">San Francisco, California</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Bio</h4>
              <p className="text-sm text-gray-700">
                Marketing professional with 4+ years of experience in the tech
                industry. Passionate about product strategy and customer
                acquisition.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
              📱
            </button>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
              ✉️
            </button>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
              🔗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
