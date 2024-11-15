const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');


// Route for downloading Excel file
router.get('/download/excel', excelController.downloadExcel);

// Remove checkAuth if you don't want authentication

module.exports = router;