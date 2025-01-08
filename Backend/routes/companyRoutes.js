const express = require("express");
const router = express.Router();
const {
  getCompanies,
  addCompany,
} = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to add company details
//http:localhost:5000/api/addCompanies
//http:localhost:5000/api/companies

router.post("/addCompanies", authMiddleware, addCompany);
router.get("/companies", authMiddleware, getCompanies);

module.exports = router;
