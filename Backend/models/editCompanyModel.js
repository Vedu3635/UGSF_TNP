const pool = require("../config/pool");

// Update company details in the database
exports.editCompany = (company_id, companyData) => {
  return new Promise((resolve, reject) => {
    // Validate company_id
    if (!company_id) {
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

    // Add the company_id to the values array for the WHERE clause
    const query = `
      UPDATE companies
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE company_id = ?
    `;
    values.push(company_id);

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
