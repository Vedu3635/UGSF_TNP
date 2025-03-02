import React from "react";

const Mentorship = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">Mentorship Program</h2>
      </div>

      <div className="p-6 text-center">
        <div className="text-4xl mb-3">🧠</div>
        <h3 className="font-medium mb-2">Share Your Knowledge</h3>
        <p className="text-sm text-gray-600 mb-6">
          Help current students by becoming a mentor in your field of expertise.
        </p>
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md font-medium">
          Join as Mentor
        </button>
      </div>
    </div>
  );
};

export default Mentorship;
