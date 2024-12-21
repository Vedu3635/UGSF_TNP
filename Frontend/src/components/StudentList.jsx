import React, { useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  IndianRupee,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DownloadButton2 from "./DownloadButton2";
const StudentCard = ({ item, type }) => {
  return (
    <div
      className={`${
        type === "placement" ? "bg-blue-100" : "bg-green-100"
      } p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col space-y-2`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {item.FirstName} {item.LastName}
        </h2>
        <span
          className={`text-sm font-semibold bg-white px-3 py-1 rounded-full ${
            type === "placement" ? "text-blue-600" : "text-green-600"
          }`}
        >
          {type === "placement"
            ? `${`${item.package / 100000}LPA` || "N/A"}`
            : `${item.university_name || "N/A"}`}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-gray-600">
        <div>
          <span className="font-medium text-xs">Roll Number</span>
          <p className="text-sm">{item.StudentId || "N/A"}</p>
        </div>
        <div>
          <span className="font-medium text-xs">Program</span>
          <p className="text-sm">{item.Program || "N/A"}</p>
        </div>
        {type === "placement" ? (
          <div>
            <span className="font-medium text-xs">Company</span>
            <p className="text-sm">{item.company_name || "N/A"}</p>
          </div>
        ) : (
          <div>
            <span className="font-medium text-xs">Course</span>
            <p className="text-sm">{item.course_name || "N/A"}</p>
          </div>
        )}
        {type === "placement" ? (
          <div className="mt-2 flex items-center       space-x-2">
            <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full">
              {item.position || "N/A"}
            </span>
          </div>
        ) : (
          <div className="mt-2 flex items-center       space-x-2">
            <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full">
              {item.intake_year || "N/A"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-200"
  >
    {children}
  </button>
);

const PaginatedList = ({ items, type, initialItemsPerPage = 25 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-2 rounded-md ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      <div className="space-y-4 mb-4">
        {currentItems.map((item, index) => (
          <StudentCard key={index} item={item} type={type} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </PaginationButton>
          {renderPageNumbers()}
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </PaginationButton>
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded-md"
        >
          {[25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}{" "}
        items
      </div>
    </div>
  );
};

const StudentList = () => {
  const [activeTab, setActiveTab] = useState("placements");
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

  const lists = {
    placements: placementData,
    higherStudies: higherStudiesData,
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-lg">
      {/* Tabs for switching between placements and higher studies */}
      <div className="flex items-center justify-center relative mb-6">
        {/* Center-aligned tabs */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          {["placements", "higherStudies"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        {/* Right-aligned download button */}
        <div className="ml-auto">
          <DownloadButton2 />
        </div>
      </div>

      {/* Header for the active tab */}

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

      {/* Paginated list for the active tab data */}
      <PaginatedList
        items={lists[activeTab]}
        type={activeTab === "placements" ? "placement" : "higherStudies"}
      />
    </div>
  );
};

export default StudentList;
