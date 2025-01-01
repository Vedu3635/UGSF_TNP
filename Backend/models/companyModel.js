const pool = require("../config/pool");

// Add a new company to the database
exports.addCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    const {
      Company_Name,
      Industry_Domain,
      Website_URL,
      Contact_Name,
      Contact_Email,
      Contact_Phone,
      Job_Roles,
      Positions,
      Package_Min,
      Package_Max,
      Employment_Type,
      Eligibility_Criteria,
      Selection_Rounds,
      Hiring_Date,
      Mode_Hiring,
    } = companyData;

    const query = `
      INSERT INTO companies (
        Company_Name,
        Industry_Domain,
        Website_URL,
        Contact_Name,
        Contact_Email,
        Contact_Phone,
        Job_Roles,
        Positions,
        Package_Min,
        Package_Max,
        Employment_Type,
        Eligibility_Criteria,
        Selection_Rounds,
        Hiring_Date,
        Mode_Hiring
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      Company_Name,
      Industry_Domain,
      Website_URL,
      Contact_Name,
      Contact_Email,
      Contact_Phone,
      Job_Roles,
      Positions,
      Package_Min,
      Package_Max,
      Employment_Type,
      Eligibility_Criteria,
      Selection_Rounds,
      Hiring_Date,
      Mode_Hiring,
    ];

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
