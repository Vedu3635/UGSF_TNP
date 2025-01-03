import React from "react";

const StudentCard = ({ item, type }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "all":
        return "bg-purple-100";
      case "placement":
        return "bg-blue-100";
      case "higherStudies":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case "all":
        return "text-purple-600";
      case "placement":
        return "text-blue-600";
      case "higherStudies":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = () => {
    switch (type) {
      case "all":
        return item.current_status || "N/A";
      case "placement":
        return `${item.package / 100000}LPA` || "N/A";
      case "higherStudies":
        return item.university_name || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col space-y-2`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {item.FirstName} {item.LastName}
        </h2>
        <span
          className={`text-sm font-semibold bg-white px-3 py-1 rounded-full ${getStatusColor()}`}
        >
          {getStatusText()}
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
        {type === "placement" && (
          <div>
            <span className="font-medium text-xs">Company</span>
            <p className="text-sm">{item.company_name || "N/A"}</p>
          </div>
        )}
        {type === "higherStudies" && (
          <div>
            <span className="font-medium text-xs">Course</span>
            <p className="text-sm">{item.course_name || "N/A"}</p>
          </div>
        )}
        {type === "all" && (
          <div>
            <span className="font-medium text-xs">Batch</span>
            <p className="text-sm">{item.batch || "N/A"}</p>
          </div>
        )}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full">
            {type === "placement"
              ? item.position
              : type === "higherStudies"
              ? item.intake_year
              : item.department || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
