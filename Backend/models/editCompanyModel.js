const pool = require("../config/pool");

// Update company details in the database
exports.editCompany = (companyId, companyData) => {
  return new Promise((resolve, reject) => {
    // Validate companyId
    if (!companyId) {
      return reject(new Error("Company ID is required."));
    }

    // Dynamically construct the SET clause and values
    const fields = Object.entries(companyData).filter(
      ([_, value]) => value !== undefined && value !== null
    ); // Filter out undefined or null fields

    if (fields.length === 0) {
      return reject(new Error("No valid fields provided to update."));
    }

    const setClause = fields.map(([key]) => `${key} = ?`).join(", ");
    const values = fields.map(([_, value]) => value);

    // Add the companyId to the values array for the WHERE clause
    const query = `
      UPDATE companies
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE Id = ?
    `;
    values.push(companyId);

    // Execute the query
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error updating company details:", error);
        return reject(error);
      }

      resolve(results);
    });
  });
};
