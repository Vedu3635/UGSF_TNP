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

export default StudentCard;
