const express = require('express');
const router = express.Router();
const { deleteCompany } = require('../controllers/deleteCompany');
const authMiddleware = require("../middleware/authMiddleware");

router.delete('/delete-company/:id', authMiddleware, deleteCompany);

module.exports = router;