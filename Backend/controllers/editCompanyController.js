const editCompanyModel = require("../models/editCompanyModel");

// Controller to handle editing company details
exports.editCompany = async (req, res) => {
  const companyId = req.params.id; // Get company ID from URL params
  const {
    Company_Name,
    Domain,
    Positions,
    Package_Min,
    Package_Max,
    Hiring_Date,
  } = req.body;

  // Validate input data
  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required." });
  }

  if (!Company_Name && !Domain && !Positions && !Package_Min && !Package_Max && !Hiring_Date) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update." });
  }

  try {
    const result = await editCompanyModel.editCompany(companyId, {
      Company_Name,
      Domain,
      Positions,
      Package_Min,
      Package_Max,
      Hiring_Date,
    });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Company not found or no changes made." });
    }

    res.status(200).json({ message: "Company details updated successfully." });
  } catch (error) {
    console.error("Error editing company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while editing company details." });
  }
};
