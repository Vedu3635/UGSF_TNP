// const express = require("express");
// const { updateStudent } = require("../controllers/editAllStudent");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Route to update a student
// // api ->http://localhost:5000/api/edit-student/4
// router.put("/:id", authMiddleware, updateStudent);

// module.exports = router;

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/editStudent');

// Student update routes
router.put('/updateStudent/:studentId', studentController.updateStudentDetails);
router.put('/updatePlacement/:studentId', studentController.updatePlacementDetails);
router.put('/updateHigherStudies/:studentId', studentController.updateHigherStudiesDetails);

module.exports = router;
