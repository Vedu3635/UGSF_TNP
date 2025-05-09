import React, { useState, useEffect, lazy, Suspense } from "react";
import LeftSlider2 from "../../components/TNP/LeftSlider2";
import LoadingPage from "../LoadingPage";
import { X, Menu, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

// Lazy-load components that depend on activeSection
const NumberBox = lazy(() => import("../../components/TNP/NumberBox"));
const Charts = lazy(() => import("../../components/TNP/Charts"));
const CompanyList = lazy(() =>
  import("../../components/TNP/company/CompanyList")
);
const StudentList = lazy(() =>
  import("../../components/TNP/student/StudentList")
);
const EducationDataManager = lazy(() =>
  import("../../components/TNP/file/EducationDataManager")
);
const CompanyRegistrationForm = lazy(() =>
  import("../../components/TNP/company/CompanyRegistrationForm")
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard"
  );
  const [companiesData, setCompaniesData] = useState([]);
  const [placementData, setPlacementData] = useState([]);
  const [higherStudiesData, setHigherStudiesData] = useState([]);
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
    setIsMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isSidebarExpanded) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isSidebarExpanded) setIsHovering(false);
  };

  const fetchCompaniesData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/companies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
          fetch(`${import.meta.env.VITE_API_URL}/students/job-placement`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/students/higher-studies`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/students/all`, {
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

        // Sort each dataset by enrollmentId
        const sortedPlacements = (placements.data || []).sort((a, b) =>
          a.enrollment_id.localeCompare(b.enrollment_id)
        );
        const sortedHigherStudies = (higherStudies.data || []).sort((a, b) =>
          a.enrollment_id.localeCompare(b.enrollment_id)
        );
        const sortedAllStudents = (allStudents.data || []).sort((a, b) =>
          a.enrollment_id.localeCompare(b.enrollment_id)
        );

        setPlacementData(sortedPlacements);
        setHigherStudiesData(sortedHigherStudies);
        setAllStudentsData(sortedAllStudents);
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
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStudentUpdate = () => fetchStudentData();
  const onStudentUpload = () => fetchStudentData();
  const onDeleteStudent = () => fetchStudentData();

  const calculateAveragePackage = (data) =>
    data?.length
      ? Math.round(
          data
            .filter((student) => student?.salary_package > 0)
            .reduce((sum, student) => sum + student.salary_package, 0) /
            data.filter((student) => student?.salary_package > 0).length /
            100000
        ) || 0
      : 0;

  const averagePackage = calculateAveragePackage(placementData);

  const getPlacedStudentsCount = (data) =>
    data?.filter(
      (student) => student?.salary_package > 0 && student.company_name
    ).length || 0;

  const placedStudentsCount = getPlacedStudentsCount(placementData);

  return (
    <>
      {isLoading ? (
        <LoadingPage /> // Show LoadingPage while fetching data
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] relative">
            {/* Desktop Toggle Button */}
            <button
              className={`fixed top-20 z-50 hidden md:flex bg-white text-black p-2 rounded-md shadow-lg hover:bg-blue-800 transition-all duration-300 ease-in-out
                ${isSidebarExpanded ? "left-52" : "left-3"}`}
              onClick={toggleSidebar}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label={
                isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"
              }
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
                onUploadClick={() => {}} // Placeholder, update if needed
              />
            </aside>

            {/* Main Content */}
            <main
              className={`flex-1 p-2 sm:p-4 lg:p-6 bg-[#bed5e7] overflow-auto transition-all duration-300 pt-16 md:pt-4
                ${isSidebarExpanded || isHovering ? "md:ml-64" : "md:ml-16"}`}
            >
              <Suspense fallback={<LoadingPage />}>
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
                    <CompanyRegistrationForm
                      onSubmitSuccess={fetchCompaniesData}
                    />
                  )}

                  {activeSection === "upload" && (
                    <EducationDataManager onStudentUpload={onStudentUpload} />
                  )}
                </div>
              </Suspense>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
