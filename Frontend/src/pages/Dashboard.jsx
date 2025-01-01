import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftSlider2 from "../components/LeftSlider2";
import NumberBox from "../components/NumberBox";
import Charts from "../components/Charts";
import CompanyList from "../components/CompanyList";
import StudentList from "../components/StudentList";
import FileUploadModal from "../components/FileUploadModal";
import CompanyRegistrationForm from "../components/CompanyRegistrationForm";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard" // Default to 'dashboard' if not set
  );
  const [placementData, setPlacementData] = useState([]);
  const [higherStudiesData, setHigherStudiesData] = useState([]);
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section); // Save to localStorage
  };

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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex">
        <LeftSlider2
          setActiveSection={handleSetActiveSection}
          activeSection={activeSection}
          onUploadClick={handleUploadClick}
          className="left-slider"
        />
        <div className="flex-1 p-4 bg-[#bed5e7] overflow-auto ml-[16rem]">
          <div className="max-w-7xl mx-auto">
            {/* Conditional rendering based on activeSection */}
            {activeSection === "dashboard" && (
              <>
                <NumberBox
                  studentsCount={allStudentsData.length}
                  higherStudiesCount={higherStudiesData.length}
                  placedStudentsCount={placementData.length}
                />
                <Charts
                  allStudentsData={allStudentsData}
                  placementData={placementData}
                  higherStudiesData={higherStudiesData}
                />
                <CompanyList />
              </>
            )}
            {activeSection === "studentList" && (
              <StudentList
                allStudentsData={allStudentsData}
                placementData={placementData}
                higherStudiesData={higherStudiesData}
              />
            )}
            {activeSection === "companiesReg" && <CompanyRegistrationForm />}
          </div>
        </div>
      </div>
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
