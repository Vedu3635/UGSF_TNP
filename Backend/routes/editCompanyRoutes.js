const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/editCompanyController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to edit company details
router.put("/:id", authMiddleware, editCompanyController.editCompany);

module.exports = router;
