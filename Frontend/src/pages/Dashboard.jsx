import React from "react";
import Navbar from "../components/Navbar";
import LeftSlider from "../components/LeftSlider";
import NumberBox from "../components/NumberBox";
import RecentCompanies from "../components/RecentCompanies";
import UpcomingCompanies from "../components/UpcomingCompanies";
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
            <b>Upcoming Companies:</b>
            <UpcomingCompanies />
            <b>Recent Companies:</b>
            <RecentCompanies />
            <Charts />
            <StudentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
