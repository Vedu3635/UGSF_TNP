const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to add company details
//localhost:5000/api/companies
// http://localhost:5000/api/students/job-placement
router.post("/companies", authMiddleware, companyController.addCompany);

module.exports = router;
