const pool = require("../config/pool");

// Add a new company to the database
exports.addCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    const { Company_Name, Domain, Positions, Package_Min, Package_Max, Hiring_Date } = companyData;

    const query = `
      INSERT INTO companies (Company_Name, Domain, Positions, Package_Min, Package_Max, Hiring_Date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [Company_Name, Domain, Positions, Package_Min, Package_Max, Hiring_Date];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
