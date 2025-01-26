const express = require('express');
const router = express.Router();
const { deleteStudent } = require('../controllers/deleteStudent');

// Route for deleting a student
router.delete('/deleteStudent/:studentId', deleteStudent);

module.exports = router;