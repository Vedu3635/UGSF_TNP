const express = require('express');
const router = express.Router();
const { deleteStudent } = require('../controllers/deleteStudent');
const authMiddleware = require("../middleware/authMiddleware");

// Route for deleting a student
router.delete('/deleteStudent/:studentId', authMiddleware, deleteStudent);

module.exports = router;