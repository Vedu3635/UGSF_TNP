import React from "react";
import { PiStudentFill, PiBuildingOfficeFill } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
// import { text } from "body-parser";

const NumberBox = () => {
  // Predefined colors for each item
  const colorClasses = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-500",
      text: "text-green-600",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-600",
    },
    pink: {
      bg: "bg-pink-500",
      text: "text-pink-600",
    },
  };

  return (
    <div className="flex justify-around p-4 rounded shadow bg-gray-100 ">
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
        {
          icon: FaUserTie,
          title: "Placed Students",
          count: 200,
          color: "pink",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-4 rounded-2xl shadow-md w-full sm:w-64"
        >
          {/* Render the icon with the correct color classes */}
          {React.createElement(item.icon, {
            className: `h-12 w-12 ${
              colorClasses[item.color].bg
            } text-white rounded-2xl p-2 mr-4`,
          })}
          <div className="border-r-2 border-red-800 m-0.5"></div>
          <div>
            <h2
              className={`text-lg font-bold ${colorClasses[item.color].text}`}
            >
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
