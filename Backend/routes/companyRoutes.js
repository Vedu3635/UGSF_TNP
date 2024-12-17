const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Route to add company details
router.post("/companies", companyController.addCompany);

module.exports = router;
