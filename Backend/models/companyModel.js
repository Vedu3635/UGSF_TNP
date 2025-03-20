const pool = require("../config/pool");

// Add a new company to the database
exports.addCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    const {
      company_name,
      industry_domain,
      website_url,
      contact_name,
      contact_email,
      contact_phone,
      job_roles,
      positions,
      package_min,
      package_max,
      job_location,
      employment_type,
      eligibility_criteria,
      selection_rounds,
      hiring_date,
      mode_hiring,
    } = companyData;

    const query = `
      INSERT INTO companies (
        company_name,
      industry_domain,
      website_url,
      contact_name,
      contact_email,
      contact_phone,
      job_roles,
      positions,
      package_min,
      package_max,
      job_location,
      employment_type,
      eligibility_criteria,
      selection_rounds,
      hiring_date,
      mode_hiring
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      company_name,
      industry_domain,
      website_url,
      contact_name,
      contact_email,
      contact_phone,
      job_roles,
      positions,
      package_min,
      package_max,
      job_location,
      employment_type,
      eligibility_criteria,
      selection_rounds,
      hiring_date,
      mode_hiring,
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
