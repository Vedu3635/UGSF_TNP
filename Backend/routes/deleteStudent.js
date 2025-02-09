const express = require("express");
const router = express.Router();
const { deleteStudent } = require("../controllers/deleteStudent");
const authMiddleware = require("../middleware/authMiddleware");

// Route for deleting a student
//localhost:5000/api/deleteStudent/41
http: router.delete("/deleteStudent/:studentId", authMiddleware, deleteStudent);

module.exports = router;
