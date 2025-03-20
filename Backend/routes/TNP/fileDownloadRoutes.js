const express = require("express");
const router = express.Router();
const fileDownload = require("../../controllers/TNP/fileDownload");
const authMiddleware = require("../../middleware/authMiddleware");

// Route for downloading Excel file
//table parameter only: http://localhost:5000/api/download/excel?table=students
//table and year parameters: http://localhost:5000/api/download/excel?table=students&year=2022

router.get("/download/excel", authMiddleware, fileDownload.downloadExcel);

// Remove checkAuth if you don't want authentication

module.exports = router;
