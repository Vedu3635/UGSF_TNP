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
  } = req.body;

  // Validate input data
  if (
    !Company_Name ||
    !Industry_Domain ||
    !Website_URL ||
    !Contact_Name ||
    !Contact_Email ||
    !Contact_Phone ||
    !Job_Roles ||
    !Positions ||
    !Package_Min ||
    !Package_Max ||
    !Employment_Type ||
    !Eligibility_Criteria ||
    !Selection_Rounds ||
    !Hiring_Date ||
    !Mode_Hiring
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await companyModel.addCompany({
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
    });
    res.status(201).json({ message: "Company details added successfully." });
  } catch (error) {
    console.error("Error adding company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding company details." });
  }
};
