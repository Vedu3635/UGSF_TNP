import React from "react";
import { PiStudentFill, PiBuildingOfficeFill } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";

const NumberBox = ({ studentsCount, higherStudiesCount,placedStudentsCount }) => {
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

  const items = [
    { icon: PiStudentFill, title: "Students", count: studentsCount, color: "blue" },
    { icon: GiBookmarklet, title: "Higher Studies", count: higherStudiesCount, color: "green" },
    { icon: PiBuildingOfficeFill, title: "Companies", count: 25, color: "purple" },
    { icon: FaUserTie, title: "Placed Students", count: placedStudentsCount, color: "pink" },
  ];

  return (
    <div className="flex flex-wrap justify-between p-4 rounded shadow bg-gray-100 mb-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-3 rounded-2xl shadow-md m-2 flex-grow flex-shrink-0 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)]"
        >
          {React.createElement(item.icon, {
            className: `h-10 w-10 sm:h-12 sm:w-12 ${
              colorClasses[item.color].bg
            } text-white rounded-2xl p-2 mr-3`,
          })}
          <div className="border-r-2 border-gray-200 h-12 mx-2"></div>
          <div className="flex flex-col min-w-0">
            <h2
              className={`text-sm sm:text-base font-bold ${
                colorClasses[item.color].text
              } truncate`}
            >
              {item.title}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberBox;
