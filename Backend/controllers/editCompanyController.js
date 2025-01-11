const editCompanyModel = require("../models/editCompanyModel");

// Controller to handle editing company details
exports.editCompany = async (req, res) => {
  const companyId = req.params.id; // Get company ID from URL params

  // Extract fields from the request body
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

  // Validate required input data
  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required." });
  }

  const fieldsToUpdate = {
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
  };

  // Remove undefined or null fields
  const sanitizedFields = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );

  // If no fields are provided for update
  if (Object.keys(sanitizedFields).length === 0) {
    return res.status(400).json({
      message: "At least one valid field is required to update.",
    });
  }

  try {
    // Pass the sanitized fields to the model
    const result = await editCompanyModel.editCompany(
      companyId,
      sanitizedFields
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Company not found or no changes made." });
    }

    return res
      .status(200)
      .json({ message: "Company details updated successfully." });
  } catch (error) {
    console.error("Error editing company details:", error);
    return res.status(500).json({
      message:
        "An internal server error occurred while editing company details.",
    });
  }
};
