// studentRoutes.js
const express = require("express");
const {
  getJobPlacementStudents,
  getHigherStudiesStudents,
  getAllStudents,
} = require("../controllers/studentController");

const router = express.Router();

// Route to get job placement students
// http://localhost:5000/api/students/job-placement
router.get("/job-placement", getJobPlacementStudents);

// Route to get higher studies students
// http://localhost:5000/api/students/higher-studies
router.get("/higher-studies", getHigherStudiesStudents);

// Route to get all the students
// http://localhost:5000/api/students/all
router.get("/all", getAllStudents);

module.exports = router;
