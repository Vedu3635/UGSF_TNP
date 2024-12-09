import React from "react";

// Card-related components
const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-300 ${
        hover ? "hover:scale-105" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`p-4 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-50 ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-semibold text-gray-800 ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CompanyLogo = ({ name, size = 60 }) => {
  const colorHash = name
    .split("")
    .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);
  const hue = Math.abs(colorHash % 360);

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shadow-lg"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

// CompanyCard Component
const CompanyCard = ({ company, type }) => {
  const isUpcoming = type === "upcoming";

  return (
    <Card className={`border-${isUpcoming ? "blue" : "green"}-200`}>
      <CardContent>
        <div className="flex items-center space-x-5">
          <CompanyLogo name={company.name} size={70} />
          <div>
            <CardTitle>{company.name}</CardTitle>
            <p className="text-sm text-gray-600">{company.date}</p>
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <p>
                <strong>Domain:</strong> {company.domain}
              </p>
              <p>
                <strong>Positions:</strong> {company.positions}
              </p>
              <p>
                <strong>Package:</strong> ₹{company.packageMin} - ₹
                {company.packageMax} LPA
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
