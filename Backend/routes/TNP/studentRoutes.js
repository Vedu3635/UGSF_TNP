// studentRoutes.js
const express = require("express");
const {
  getJobPlacementStudents,
  getHigherStudiesStudents,
  getAllStudents,
} = require("../../controllers/TNP/studentController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

// Route to get job placement students
// http://localhost:5000/api/students/job-placement
router.get("/job-placement", authMiddleware, getJobPlacementStudents);

// Route to get higher studies students
// http://localhost:5000/api/students/higher-studies
router.get("/higher-studies", authMiddleware, getHigherStudiesStudents);

// Route to get all the students
// http://localhost:5000/api/students/all
router.get("/all", authMiddleware, getAllStudents);

module.exports = router;
