import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LeftSlider2 from "../../components/TNP/LeftSlider2";
import NumberBox from "../../components/TNP/NumberBox";
import Charts from "../../components/TNP/Charts";
import CompanyList from "../../components/TNP/CompanyList";
import StudentList from "../../components/TNP/StudentList";
import FileUploadModal from "../../components/TNP/FileUploadModal";
import CompanyRegistrationForm from "../../components/TNP/CompanyRegistrationForm";
import {
  X,
  Menu,
  ChevronRightIcon,
  ChevronLeft,
  ChevronLeftIcon,
} from "lucide-react";
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard"
  );
  const [companiesData, setCompaniesData] = useState([]);
  const [placementData, setPlacementData] = useState([]);
  const [higherStudiesData, setHigherStudiesData] = useState([]);
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // true: expanded, false: collapsed
  const [isHovering, setIsHovering] = useState(false);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isSidebarExpanded) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSidebarExpanded) {
      setIsHovering(false);
    }
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
        console.error("Failed to fetch companies data:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchStudentData = async () => {
    setIsLoading(true);
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

        setPlacementData(placements.data || []);
        setHigherStudiesData(higherStudies.data || []);
        setAllStudentsData(allStudents.data || []);
      } else {
        console.error("Error fetching student data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCompaniesData(), fetchStudentData()]);
      setIsLoading(false);
    };

    fetchAllData();

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStudentUpdate = () => {
    fetchStudentData();
  };

  const onDeleteStudent = () => {
    fetchStudentData();
  };

  const calculateAveragePackage = (data) => {
    if (!data || data.length === 0) return 0;

    const filteredData = data.filter(
      (student) => student && student.package && student.package > 0
    );
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
    if (!data) return 0;
    return data.filter(
      (student) => student && student.package > 0 && student.company_name
    ).length;
  };

  const placedStudentsCount = getPlacedStudentsCount(placementData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] relative">
        {/* Desktop Toggle Button */}
        <button
          className={`fixed top-20 z-50 hidden md:flex bg-white text-black p-2 rounded-md shadow-lg hover:bg-blue-800 transition-all duration-300 ease-in-out
  ${isSidebarExpanded ? "left-48" : "left-3 "}
`}
          onClick={toggleSidebar}
          aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarExpanded ? (
            <ChevronLeftIcon size={20} />
          ) : (
            <ChevronRightIcon size={20} />
          )}
        </button>

        {/* Mobile Toggle Button */}
        <button
          className="fixed top-20 z-50 flex md:hidden bg-white text-black p-2 rounded-md shadow-lg hover:bg-blue-800 transition-all duration-300 ease-in-out left-3"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out 
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:z-auto flex-shrink-0
    ${isSidebarExpanded || isHovering ? "w-64" : "w-16"} 
    bg-white border-r border-gray-200 shadow-lg md:shadow-none`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LeftSlider2
            isExpanded={isSidebarExpanded || isHovering}
            setIsExpanded={setIsSidebarExpanded}
            setActiveSection={handleSetActiveSection}
            activeSection={activeSection}
            onUploadClick={handleUploadClick}
          />
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-2 sm:p-4 lg:p-6 bg-[#bed5e7] overflow-auto transition-all duration-300 pt-16 md:pt-4
    ${isSidebarExpanded || isHovering ? "md:ml-64" : "md:ml-16"} `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {activeSection === "dashboard" && (
                <div className="space-y-4 md:space-y-6">
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
                </div>
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

              {activeSection === "companiesReg" && (
                <CompanyRegistrationForm onSubmitSuccess={fetchCompaniesData} />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          fetchStudentData();
          fetchCompaniesData();
        }}
      />
    </div>
  );
};

export default Dashboard;
