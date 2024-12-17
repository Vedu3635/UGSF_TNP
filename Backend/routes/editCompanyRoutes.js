const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/editCompanyController");

// Route to edit company details
router.put("/companies/:id", editCompanyController.editCompany);

module.exports = router;
