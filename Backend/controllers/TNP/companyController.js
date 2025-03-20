const companyModel = require("../../models/companyModel");
const pool = require("../../config/pool");

//Controller to get the compaines
exports.getCompanies = async (req, res) => {
  try {
    const query = "SELECT * FROM companies"; // Make sure this table exists
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle adding company details
exports.addCompany = async (req, res) => {
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
  } = req.body;

  // Validate input data
  if (
    !company_name ||
    !industry_domain ||
    !website_url ||
    !contact_name ||
    !contact_email ||
    !contact_phone ||
    !job_roles ||
    !positions ||
    !package_min ||
    !package_max ||
    !job_location ||
    !employment_type ||
    !eligibility_criteria ||
    !selection_rounds ||
    !hiring_date ||
    !mode_hiring
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await companyModel.addCompany({
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
    });
    res.status(201).json({ message: "Company details added successfully." });
  } catch (error) {
    console.error("Error adding company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding company details." });
  }
};
