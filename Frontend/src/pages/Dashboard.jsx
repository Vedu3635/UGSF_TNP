import React from "react";
import Navbar from "../components/Navbar";
import LeftSlider from "../components/LeftSlider";
import RightSlider from "../components/RightSlider";
import NumberBox from "../components/NumberBox";
import CompanySlider from "../components/CompanySlider";
import CompanySlider1 from "../components/CompanySlider1";
import Charts from "../components/Charts";
import StudentList from "../components/StudentList";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row">
        <LeftSlider />
        <div className="flex-1 p-4 bg-[#bed5e7] overflow-auto">
          <div className="max-w-7xl mx-auto">
            <NumberBox />
            <b>Recent Companies:</b>
            <CompanySlider />
            <b>Upcoming Companies:</b>
            <CompanySlider1 />
            <Charts />
            <StudentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
