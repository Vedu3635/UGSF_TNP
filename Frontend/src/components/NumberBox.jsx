import React from "react";
import { PiStudentFill, PiBuildingOfficeFill } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";

const NumberBox = () => {
  return (
    <div className="flex justify-around p-4 rounded shadow pb-6 bg-gray-100">
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl shadow-md">
        <div>
          <PiStudentFill className="h-12 w-12 bg-blue-500 text-white rounded-2xl mt-2 ml-2 p-2"/>
        </div>
        <div className="border-r-2 border-gray-300 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-blue-600">Students</h2>
          <p className="text-3xl font-bold text-gray-800">1000</p>
        </div>
      </div>
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl shadow-md">
        <GiBookmarklet className="h-12 w-12 bg-green-500 text-white rounded-2xl mt-2 ml-2 p-2"/>
        <div className="border-r-2 border-gray-300 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-green-600">Higher Studies</h2>
          <p className="text-3xl font-bold text-gray-800">1000</p>
        </div>
      </div>
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl shadow-md">
        <PiBuildingOfficeFill className="h-12 w-12 bg-purple-500 text-white rounded-2xl mt-2 ml-2 p-2"/>
        <div className="border-r-2 border-gray-300 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-purple-600">Companies</h2>
          <p className="text-3xl font-bold text-gray-800">150</p>
        </div>
      </div>
    </div>
  );
};

export default NumberBox;