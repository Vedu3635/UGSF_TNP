import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import { PiBuildingOfficeFill } from "react-icons/pi";

const NumberBox = () => {
  return (
    <div className="flex justify-around p-4 rounded shadow pb-6">
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl ">
        {/* <img src="src\student.jpg" alt="hi" className="h-16 rounded-3xl " /> */}
        <div className="bg-[#82e3d9]">
          <PiStudentFill />
        </div>
        <div className="border-r-4 text border-red-700 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-red-500">Students</h2>
          <p className="text-3xl font-bold">1000</p>
        </div>
      </div>
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl">
        {/* <img
          src="src\higherstudies.jpg"
          alt="hi"
          className="h-16 rounded-3xl"
        /> */}
        <GiBookmarklet />
        <div className="border-r-4 text border-red-700 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-red-500">Higher Studies</h2>
          <p className="text-3xl font-bold">1000</p>
        </div>
      </div>
      <div className="scale-125 text-center flex gap-3 bg-white p-2 rounded-2xl">
        {/* <img src="src\packages.jpg" alt="hi" className="h-16 rounded-3xl" /> */}
        <PiBuildingOfficeFill />
        <div className="border-r-4 text border-red-700 m-0.5"></div>
        <div>
          <h2 className="text-xl font-bold text-red-500">Companies</h2>
          <p className="text-3xl font-bold">150</p>
        </div>
      </div>
    </div>
  );
};

export default NumberBox;
