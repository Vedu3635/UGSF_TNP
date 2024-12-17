const companyModel = require("../models/companyModel");

// Controller to handle adding company details
exports.addCompany = async (req, res) => {
  const { Company_Name, Domain, Positions, Package_Min, Package_Max, Hiring_Date } = req.body;

  // Validate input data
  if (!Company_Name || !Domain || !Positions || !Package_Min || !Package_Max || !Hiring_Date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await companyModel.addCompany({ Company_Name, Domain, Positions, Package_Min, Package_Max, Hiring_Date });
    res.status(201).json({ message: "Company details added successfully." });
  } catch (error) {
    console.error("Error adding company details:", error);
    res.status(500).json({ message: "An error occurred while adding company details." });
  }
};
