const express = require("express");
const router = express.Router();
const { deleteCompany } = require("../../controllers/TNP/deleteCompany");
const authMiddleware = require("../../middleware/authMiddleware");

router.delete("/delete-company/:id", authMiddleware, deleteCompany);

module.exports = router;
