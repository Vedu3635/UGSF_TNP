import React, { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Users,
  CheckCircle,
  XCircle,
  Circle,
  Menu,
  X,
} from "lucide-react";

import PaginatedList from "./PaginatedList";
import FilterComponent from "./FilterComponent";

const StudentList = ({
  allStudentsData,
  placementData,
  higherStudiesData,
  onStudentUpdate,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [filters, setFilters] = useState({
    enrollment_year: "",
    career_choice: "",
    semester: "",
    placement_year: "",
    company_name: "",
    position: "",
    university_name: "",
    course_name: "",
    program: "",
    admission_year: "",
  });

  const resetFilters = () => {
    setFilters({
      enrollment_year: "",
      career_choice: "",
      semester: "",
      placement_year: "",
      company_name: "",
      position: "",
      university_name: "",
      course_name: "",
      program: "",
      admission_year: "",
    });
    setSearchTerm("");
    setStatusFilter("all");
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Close mobile nav when clicking outside
  useEffect(() => {
    if (!isMobileNavOpen) return;

    const handleClickOutside = (event) => {
      // If the click was outside the mobile nav and not on the menu button
      if (
        isMobileNavOpen &&
        !event.target.closest(".mobile-nav") &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileNavOpen]);

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
    resetFilters();
    setIsMobileNavOpen(false); // Close mobile nav when tab changes
  };

  // Filter options
  const filterOptions = useMemo(() => {
    const getTopItems = (array, count) =>
      [...new Set(array)]
        .filter((value) => value !== "" && value !== null)
        .sort((a, b) => b - a)
        .slice(0, count);

    const options = {
      all: {
        enrollment_year: getTopItems(
          allStudentsData.map((item) => item.enrollment_year || ""),
          5
        ),
        career_choice: [
          ...new Set(
            allStudentsData
              .map((item) => item.career_choice || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        semester: [
          ...new Set(
            allStudentsData
              .map((item) => item.semester || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
      placements: {
        placement_year: [
          ...new Set(
            placementData
              .map((item) => item.placement_year || "")
              .filter(
                (value) => value !== "" && value !== null && value !== "0000"
              )
          ),
        ].sort(),
        company_name: [
          ...new Set(
            placementData
              .map((item) => item.company_name || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        position: [
          ...new Set(
            placementData
              .map((item) => item.position || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        program: [
          ...new Set(
            placementData
              .map((item) => item.program || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
      higherStudies: {
        admission_year: [
          ...new Set(
            higherStudiesData
              .map((item) => item.admission_year || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        university_name: [
          ...new Set(
            higherStudiesData
              .map((item) => item.university_name || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        course_name: [
          ...new Set(
            higherStudiesData
              .map((item) => item.course_name || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        program: [
          ...new Set(
            placementData
              .map((item) => item.program || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
    };

    return options;
  }, [allStudentsData, placementData, higherStudiesData]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "all":
        return allStudentsData;
      case "placements":
        return placementData;
      case "higherStudies":
        return higherStudiesData;
      default:
        return [];
    }
  };

  const filteredData = useMemo(() => {
    const currentData = getCurrentData();

    return currentData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key]?.toString().toLowerCase() === value.toLowerCase();
      });

      // Add status filtering logic
      let matchesStatus = true;
      if (activeTab === "placements") {
        if (statusFilter === "placed") {
          matchesStatus = item.placement_status === "placed";
        } else if (statusFilter === "notPlaced") {
          matchesStatus = item.placement_status !== "placed";
        }
      } else if (activeTab === "higherStudies") {
        if (statusFilter === "admitted") {
          matchesStatus = item.higher_studies_status === "admitted";
        } else if (statusFilter === "in process") {
          matchesStatus = item.higher_studies_status === "in process";
        } else if (statusFilter === "rejected") {
          matchesStatus = item.higher_studies_status === "rejected";
        }
      }

      return matchesSearch && matchesFilters && matchesStatus;
    });
  }, [
    activeTab,
    searchTerm,
    filters,
    statusFilter,
    allStudentsData,
    placementData,
    higherStudiesData,
  ]);

  const getTabColor = (tab) => {
    switch (tab) {
      case "all":
        return "purple";
      case "placements":
        return "blue";
      case "higherStudies":
        return "green";
      default:
        return "gray";
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "all":
        return <Users className="w-5 h-5 inline-block mr-2" />;
      case "placements":
        return <Briefcase className="w-5 h-5 inline-block mr-2" />;
      case "higherStudies":
        return <GraduationCap className="w-5 h-5 inline-block mr-2" />;
      default:
        return null;
    }
  };

  const StatusToggleButtons = () => {
    if (activeTab === "placements") {
      return (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            All
          </button>
          <button
            onClick={() => setStatusFilter("placed")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "placed"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Placed
          </button>
          <button
            onClick={() => setStatusFilter("notPlaced")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "notPlaced"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Not Placed
          </button>
        </div>
      );
    } else if (activeTab === "higherStudies") {
      return (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            All
          </button>
          <button
            onClick={() => setStatusFilter("admitted")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "admitted"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Admitted
          </button>
          <button
            onClick={() => setStatusFilter("in process")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "in process"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Circle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            In Process
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ${
              statusFilter === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Rejected
          </button>
        </div>
      );
    }
    return null;
  };

  // Modified Mobile Navigation Dropdown (not full-screen overlay)
  const MobileNavOverlay = () => {
    if (!isMobileNavOpen) return null;

    return (
      <div className="absolute right-0 top-12 z-40 lg:hidden mobile-nav">
        <div className="w-48 bg-white rounded-lg shadow-lg p-3">
          <div className="flex flex-col space-y-2">
            {["all", "placements", "higherStudies"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleSetActiveTab(tab)}
                className={`p-2 rounded-lg flex items-center text-sm ${
                  activeTab === tab
                    ? `bg-${getTabColor(tab)}-100 text-${getTabColor(
                        tab
                      )}-700 font-medium`
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {getTabIcon(tab)}
                {tab === "all"
                  ? "All Students"
                  : tab === "placements"
                  ? "Placements"
                  : "Higher Studies"}
              </button>
            ))}

            {/* <div className="pt-2 mt-1 border-t">
              <DownloadButton2 />
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto my-4 sm:my-8 p-3 sm:p-6 bg-gray-100 rounded-xl shadow-lg relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h2
            className={`text-xl font-bold ${
              activeTab === "placements"
                ? "text-blue-700"
                : activeTab === "higherStudies"
                ? "text-green-700"
                : "text-purple-700"
            } flex items-center`}
          >
            {getTabIcon(activeTab)}
            {activeTab === "all"
              ? "All Students"
              : activeTab === "placements"
              ? "Placements"
              : "Higher Studies"}
          </h2>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-2 rounded-full hover:bg-gray-200 mobile-menu-button"
          >
            <Menu className="w-6 h-6" />
          </button>

          <MobileNavOverlay />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-center relative mb-6">
          <div className="flex space-x-4">
            {["all", "placements", "higherStudies"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleSetActiveTab(tab)}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab
                    ? `bg-${getTabColor(tab)}-500 text-white`
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {getTabIcon(tab)}
                {tab === "all"
                  ? "All Students"
                  : tab === "placements"
                  ? "Placements"
                  : "Higher Studies"}
              </button>
            ))}
          </div>
          {/* <div className="absolute right-0">
            <DownloadButton2 />
          </div> */}
        </div>

        <StatusToggleButtons />

        <FilterComponent
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
          resetFilters={resetFilters}
        />

        <h2
          className="hidden lg:flex text-2xl font-bold mb-4 text-center items-center justify-center
          ${
            activeTab === 'placements'
              ? 'text-blue-700'
              : activeTab === 'higherStudies'
              ? 'text-green-700'
              : 'text-purple-700'
          }"
        >
          {getTabIcon(activeTab)}
          {activeTab === "all"
            ? "All Students"
            : activeTab === "placements"
            ? "Placements"
            : "Higher Studies"}
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 mb-4 text-center">
          Showing {filteredData.length} results
        </div>
        <PaginatedList
          items={filteredData}
          type={
            activeTab === "all"
              ? "all"
              : activeTab === "placements"
              ? "placement"
              : "higherStudies"
          }
          onStudentUpdate={onStudentUpdate}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};

export default StudentList;
