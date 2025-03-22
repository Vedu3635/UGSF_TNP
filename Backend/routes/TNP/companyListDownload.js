const express = require('express');
const router = express.Router();
const companyListDownloadController = require('../../controllers/TNP/companyListDownload');
const authMiddleware = require("../../middleware/authMiddleware");

// Route to download companies as Excel
router.get('/companies', authMiddleware ,companyListDownloadController.downloadCompanies);

module.exports = router;