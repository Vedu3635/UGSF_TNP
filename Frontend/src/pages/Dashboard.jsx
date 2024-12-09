import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftSlider from "../components/LeftSlider";
import NumberBox from "../components/NumberBox";
import RecentCompanies from "../components/RecentCompanies";
import UpcomingCompanies from "../components/UpcomingCompanies";
import Charts from "../components/Charts";
import CompanyList from "../components/CompanyList";

import StudentList from "../components/StudentList";

const Dashboard = () => {
  const [placementData, setPlacementData] = useState([]);
  const [higherStudiesData, setHigherStudiesData] = useState([]);
  const [allStudentsData, setAllStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const placementResponse = await fetch(
          "http://localhost:5000/api/students/job-placement",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const higherStudiesResponse = await fetch(
          "http://localhost:5000/api/students/higher-studies",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allStudentsResponse = await fetch(
          "http://localhost:5000/api/students/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          placementResponse.ok &&
          higherStudiesResponse.ok &&
          allStudentsResponse.ok
        ) {
          const placements = await placementResponse.json();
          const higherStudies = await higherStudiesResponse.json();
          const allStudents = await allStudentsResponse.json();

          setPlacementData(placements.data);
          setHigherStudiesData(higherStudies.data);
          setAllStudentsData(allStudents.data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(higherStudiesData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row">
        <LeftSlider />
        <div className="flex-1 p-4 bg-[#bed5e7] overflow-auto">
          <div className="max-w-7xl mx-auto">
            <NumberBox
              studentsCount={allStudentsData.length}
              higherStudiesCount={higherStudiesData.length}
              placedStudentsCount={placementData.length}
            />
            {/* <b>Upcoming Companies:</b>
            <UpcomingCompanies />
            <b>Recent Companies:</b>
            <RecentCompanies /> */}
            <Charts
              allStudentsData={allStudentsData}
              placementData={placementData}
              higherStudiesData={higherStudiesData}
            />
            <CompanyList />
            <StudentList
              placementData={placementData}
              higherStudiesData={higherStudiesData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
