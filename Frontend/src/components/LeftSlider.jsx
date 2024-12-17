import React from "react";

const LeftSlider = ({ setActiveSection }) => {
  return (
    <div className="w-full md:w-64 bg-blue-700 p-4 text-white">
      <h3 className="text-xl font-bold mb-4">Left Sidebar</h3>

      {/* Dashboard Button */}
      <button
        className="w-full py-2 px-4 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={() => setActiveSection("dashboard")}
      >
        Dashboard
      </button>

      {/* Upload Section */}
      <div className="my-4">
        <label className="block text-sm font-bold mb-2">Upload File</label>
        <input
          type="file"
          className="w-full py-2 px-3 text-black rounded-md border"
        />
        <button className="w-full mt-2 py-2 bg-green-500 hover:bg-green-600 rounded-lg">
          Upload
        </button>
      </div>

      {/* Student List Button */}
      <button
        className="w-full py-2 px-4 my-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={() => setActiveSection("studentList")}
      >
        Student List
      </button>

      {/* Companies Button */}
      <button
        className="w-full py-2 px-4 my-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={() => setActiveSection("companies")}
      >
        Companies
      </button>

      {/* Logout Button */}
      <button
        className="w-full py-2 px-4 mt-4 bg-red-500 hover:bg-red-600 rounded-lg"
        onClick={() => {
          // Clear localStorage and redirect to login (example action)
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LeftSlider;
