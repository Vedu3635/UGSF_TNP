const express = require("express");
const { updateStudent } = require("../controllers/editStudent");
//const validateStudent = require('../middlewares/validateStudent');

const router = express.Router();

// Route to update a student
// api ->http://localhost:5000/api/edit-student/4
router.put("/:id", /*validateStuden,*/ updateStudent);

module.exports = router;
