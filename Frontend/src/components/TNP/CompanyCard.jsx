import React from "react";

const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
        hover ? "hover:scale-102 hover:shadow-2xl" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2
    className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-8 py-4 ${className}`}>{children}</div>
);

const CompanyLogo = ({ name, size = 60 }) => {
  const colorHash = name
    .split("")
    .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);
  const hue = Math.abs(colorHash % 360);

  return (
    <div
      className="rounded-2xl flex items-center justify-center font-bold text-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(135deg, 
          hsl(${hue}, 85%, 65%), 
          hsl(${(hue + 40) % 360}, 85%, 45%)
        )`,
      }}
    >
      <span className="text-3xl">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
};

const CompanyCard = ({ company, type }) => {
  const isUpcoming = type === "upcoming";
  console.log(company);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="group">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <CompanyLogo name={company.Company_Name} size={90} />
          </div>

          <div className="flex-grow space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{company.Company_Name}</CardTitle>
                <div className="flex items-center mt-2 space-x-3">
                  <p className="text-gray-500 font-medium">
                    {formatDate(company.Hiring_Date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-6">
              <div>
                <div className="group/item transition-all duration-300 hover:bg-gray-50 p-1 rounded-xl">
                  <p className="text-base text-gray-500 font-medium mb-1">
                    Industry Domain
                  </p>
                  <p className="text-gray-800">{company.Industry_Domain}</p>
                </div>
                <div className="group/item transition-all duration-300 hover:bg-gray-50 p-1 rounded-xl">
                  <p className="text-base text-gray-500 font-medium mb-1">
                    Positions
                  </p>
                  <p className="text-gray-800">{company.Positions}</p>
                </div>
              </div>

              <div>
                <div className="group/item transition-all duration-300 hover:bg-gray-50 p-1 rounded-xl">
                  <p className="text-base text-gray-500 font-medium mb-1 ">
                    Package Range
                  </p>
                  <p className="text-gray-800">
                    ₹{company.Package_Min} - ₹{company.Package_Max} LPA
                  </p>
                </div>
                <div className="group/item transition-all duration-300 hover:bg-gray-50 p-1 rounded-xl">
                  <p className="text-base text-gray-500 font-medium mb-1">
                    Job Roles
                  </p>
                  <p className="text-gray-800">{company.Job_Roles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
