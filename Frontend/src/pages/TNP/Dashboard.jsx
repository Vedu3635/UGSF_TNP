import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LeftSlider2 from "../../components/TNP/LeftSlider2";
import NumberBox from "../../components/TNP/NumberBox";
import Charts from "../../components/TNP/Charts";
import CompanyList from "../../components/TNP/CompanyList";
import StudentList from "../../components/TNP/StudentList";
import FileUploadModal from "../../components/TNP/FileUploadModal";
import CompanyRegistrationForm from "../../components/TNP/CompanyRegistrationForm";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard"
  );
  const [companiesData, setCompaniesData] = useState([]);
  const [placementData, setPlacementData] = useState([]);
  const [higherStudiesData, setHigherStudiesData] = useState([]);
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  const fetchCompaniesData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCompaniesData(data);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchStudentData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [placementResponse, higherStudiesResponse, allStudentsResponse] =
        await Promise.all([
          fetch("http://localhost:5000/api/students/job-placement", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/api/students/higher-studies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/api/students/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

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
        console.error("Error fetching student data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
    fetchStudentData();
  }, []);

  const handleStudentUpdate = () => {
    fetchStudentData();
  };
  const onDeleteStudent = () => {
    fetchStudentData();
    console.log("Fetch from delete");
  };

  const calculateAveragePackage = (data) => {
    const filteredData = data.filter((student) => student.package > 0);
    const totalPackage = filteredData.reduce(
      (sum, student) => sum + student.package,
      0
    );
    return filteredData.length > 0
      ? Math.round(totalPackage / filteredData.length / 100000)
      : 0;
  };

  const averagePackage = calculateAveragePackage(placementData);

  const getPlacedStudentsCount = (data) => {
    return data.filter((student) => student.package > 0 && student.company_name)
      .length;
  };

  const placedStudentsCount = getPlacedStudentsCount(placementData);

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
            {activeSection === "dashboard" && (
              <>
                <NumberBox
                  studentsCount={allStudentsData.length}
                  averagePackage={averagePackage}
                  placedStudentsCount={placedStudentsCount}
                  companiesCount={companiesData.length}
                />
                <Charts
                  allStudentsData={allStudentsData}
                  placementData={placementData}
                  higherStudiesData={higherStudiesData}
                />
                <CompanyList companiesData={companiesData} />
              </>
            )}
            {activeSection === "studentList" && (
              <StudentList
                allStudentsData={allStudentsData}
                placementData={placementData}
                higherStudiesData={higherStudiesData}
                onStudentUpdate={handleStudentUpdate}
                onDelete={onDeleteStudent}
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
