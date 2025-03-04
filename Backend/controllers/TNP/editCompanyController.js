const editCompanyModel = require("../../models/editCompanyModel");

// Controller to handle editing company details
exports.editCompany = async (req, res) => {
  const company_id = req.params.id; // Get company ID from URL params

  // Extract fields from the request body
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
    employment_type,
    eligibility_criteria,
    selection_rounds,
    hiring_date,
    mode_hiring,
  } = req.body;

  // Validate required input data
  if (!company_id) {
    return res.status(400).json({ message: "Company ID is required." });
  }

  const fieldsToUpdate = {
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
    employment_type,
    eligibility_criteria,
    selection_rounds,
    hiring_date,
    mode_hiring,
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
      company_id,
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
