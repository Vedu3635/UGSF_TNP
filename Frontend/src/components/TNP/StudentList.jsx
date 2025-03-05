import React, { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Users,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react";
import DownloadButton2 from "./DownloadButton2";
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
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "placed", "notPlaced", "found", "notFound"

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

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); // Save to localStorage
    resetFilters(); // Reset filters when switching tabs
  };

  // Rest of your existing filterOptions code remains the same...
  const filterOptions = useMemo(() => {
    const getTopItems = (array, count) =>
      [...new Set(array)]
        .filter((value) => value !== "" && value !== null)
        .sort((a, b) => b - a) // Assuming years are numeric and in descending order
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
          matchesStatus = item.status === "placed";
        } else if (statusFilter === "notPlaced") {
          matchesStatus = item.status !== "placed";
        }
      } else if (activeTab === "higherStudies") {
        if (statusFilter === "admitted") {
          matchesStatus = item.status === "admitted";
        } else if (statusFilter === "in process") {
          matchesStatus = item.status === "in process";
        } else if (statusFilter === "rejected") {
          matchesStatus = item.status === "rejected";
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
        return "purple"; // Default tab
      case "placements":
        return "blue"; // Placement-specific color
      case "higherStudies":
        return "green"; // Higher Studies-specific color
      default:
        return "gray"; // Fallback color
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
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            All
          </button>
          <button
            onClick={() => setStatusFilter("placed")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "placed"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Placed
          </button>
          <button
            onClick={() => setStatusFilter("notPlaced")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "notPlaced"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Not Placed
          </button>
        </div>
      );
    } else if (activeTab === "higherStudies") {
      return (
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            All
          </button>
          <button
            onClick={() => setStatusFilter("admitted")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "admitted"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Admitted
          </button>
          <button
            onClick={() => setStatusFilter("in process")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "in process"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Circle className="w-4 h-4 mr-2" />
            In Process
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-4 py-2 rounded-full flex items-center ${
              statusFilter === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Application Rejected
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-center relative mb-6">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          {["all", "placements", "higherStudies"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                handleSetActiveTab(tab);
                resetFilters();
              }}
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
        <div className="ml-auto">
          <DownloadButton2 />
        </div>
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
        className={`text-2xl font-bold mb-4 ${
          activeTab === "placements"
            ? "text-blue-700"
            : activeTab === "higherStudies"
            ? "text-green-700"
            : "text-purple-700"
        } flex items-center justify-center`}
      >
        {getTabIcon(activeTab)}
        {activeTab === "all"
          ? "All Students"
          : activeTab === "placements"
          ? "Placements"
          : "Higher Studies"}
      </h2>
      <div className="text-sm text-gray-500 mb-4 text-center">
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
        onStudentUpdate={onStudentUpdate} // Pass onStudentUpdate to PaginatedList
        onDelete={onDelete}
      />
    </div>
  );
};

export default StudentList;
