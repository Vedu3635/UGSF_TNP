const pool = require("../config/pool");

// Update company details in the database
exports.editCompany = (companyId, companyData) => {
  return new Promise((resolve, reject) => {
    const {
      Company_Name,
      Domain,
      Positions,
      Package_Min,
      Package_Max,
      Hiring_Date,
    } = companyData;

    const query = `
      UPDATE companies
      SET
        Company_Name = ?,
        Domain = ?,
        Positions = ?,
        Package_Min = ?,
        Package_Max = ?,
        Hiring_Date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE Id = ?
    `;
    const values = [
      Company_Name,
      Domain,
      Positions,
      Package_Min,
      Package_Max,
      Hiring_Date,
      companyId,
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error updating company:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
