import React from "react";
import { PiStudentFill, PiBuildingOfficeFill } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";

const NumberBox = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded shadow bg-gray-100">
      {[
        { icon: PiStudentFill, title: "Students", count: 1000, color: "blue" },
        {
          icon: GiBookmarklet,
          title: "Higher Studies",
          count: 1000,
          color: "green",
        },
        {
          icon: PiBuildingOfficeFill,
          title: "Companies",
          count: 150,
          color: "purple",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-4 rounded-2xl shadow-md"
        >
          {/* Render the icon using React.createElement */}
          {React.createElement(item.icon, {
            className: `h-12 w-12 bg-${item.color}-500 text-white rounded-2xl p-2 mr-4`,
          })}
          <div className="border-r-2 border-red-800 m-0.5"></div>
          <div>
            <h2 className={`text-lg font-bold text-${item.color}-600`}>
              {item.title}
            </h2>
            <p className="text-2xl font-bold text-gray-800">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberBox;
