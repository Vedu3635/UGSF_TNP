const companyModel = require("../models/companyModel");

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
