import React, { useState, useMemo } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import DownloadButton2 from "./DownloadButton2";
import PaginatedList from "./PaginatedList";
import FilterComponent from "./FilterComponent";

const StudentList = ({ allStudentsData, placementData, higherStudiesData }) => {
  const [activeTab, setActiveTab] = useState("placements");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
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
    const options = {
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
    return options;
  }, [placementData, higherStudiesData]);

  const filteredData = useMemo(() => {
    const currentData =
      activeTab === "placements" ? placementData : higherStudiesData;

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
  }, [activeTab, searchTerm, filters, placementData, higherStudiesData]);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-lg">
      {/* Tabs */}
      <div className="flex items-center justify-center relative mb-6">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          {["placements", "higherStudies"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                resetFilters();
              }}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? `bg-${
                      tab === "placements" ? "blue" : "green"
                    }-500 text-white`
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "placements" ? (
                <Briefcase className="w-5 h-5 inline-block mr-2" />
              ) : (
                <GraduationCap className="w-5 h-5 inline-block mr-2" />
              )}
              {tab === "placements" ? "Placements" : "Higher Studies"}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <DownloadButton2 />
        </div>
      </div>

      {/* Filter Component */}
      <FilterComponent
        activeTab={activeTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        resetFilters={resetFilters}
      />

      {/* Results */}
      <h2
        className={`text-2xl font-bold mb-4 text-${
          activeTab === "placements" ? "blue" : "green"
        }-700 flex items-center justify-center`}
      >
        {activeTab === "placements" ? (
          <Briefcase className="w-6 h-6 mr-2" />
        ) : (
          <GraduationCap className="w-6 h-6 mr-2" />
        )}
        {activeTab === "placements" ? "Placements" : "Higher Studies"}
      </h2>
      <div className="text-sm text-gray-500 mb-4 text-center">
        Showing {filteredData.length} results
      </div>
      <PaginatedList
        items={filteredData}
        type={activeTab === "placements" ? "placement" : "higherStudies"}
      />
    </div>
  );
};

export default StudentList;
