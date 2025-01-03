import React, { useState, useMemo } from "react";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import DownloadButton2 from "./DownloadButton2";
import PaginatedList from "./PaginatedList";
import FilterComponent from "./FilterComponent";

const StudentList = ({ allStudentsData, placementData, higherStudiesData }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    Enrollment_Year: "",
    Career_Choice: "",
    Semester: "",
    year: "",
    company_name: "",
    position: "",
    university_name: "",
    course_name: "",
    Program: "",
    intake_year: "",
  });

  const resetFilters = () => {
    setFilters({
      Enrollment_Year: "",
      Career_Choice: "",
      Semester: "",
      year: "",
      company_name: "",
      position: "",
      university_name: "",
      course_name: "",
      Program: "",
      intake_year: "",
    });
    setSearchTerm("");
  };

  const filterOptions = useMemo(() => {
    const getTopItems = (array, count) =>
      [...new Set(array)]
        .filter((value) => value !== "" && value !== null)
        .sort((a, b) => b - a) // Assuming years are numeric and in descending order
        .slice(0, count);

    const options = {
      all: {
        Enrollment_Year: getTopItems(
          allStudentsData.map((item) => item.Enrollment_Year || ""),
          5
        ),
        Career_Choice: [
          ...new Set(
            allStudentsData
              .map((item) => item.Career_Choice || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
        Semester: [
          ...new Set(
            allStudentsData
              .map((item) => item.Semester || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
      placements: {
        year: [
          ...new Set(
            placementData
              .map((item) => item.year || "")
              .filter((value) => value !== "" && value !== null)
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
        Program: [
          ...new Set(
            placementData
              .map((item) => item.Program || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
      higherStudies: {
        intake_year: [
          ...new Set(
            higherStudiesData
              .map((item) => item.intake_year || "")
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
        Program: [
          ...new Set(
            placementData
              .map((item) => item.Program || "")
              .filter((value) => value !== "" && value !== null)
          ),
        ].sort(),
      },
    };
    console.log(options.all);
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
      // console.log(item);
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // console.log(filters);
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key]?.toString().toLowerCase() === value.toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });
  }, [
    activeTab,
    searchTerm,
    filters,
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

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-center relative mb-6">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          {["all", "placements", "higherStudies"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
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
      />
    </div>
  );
};

export default StudentList;
