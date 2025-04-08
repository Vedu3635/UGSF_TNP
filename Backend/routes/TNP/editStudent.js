// const express = require("express");
// const { updateStudent } = require("../controllers/editAllStudent");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Route to update a student
// // api ->http://localhost:5000/api/edit-student/4
// router.put("/:id", authMiddleware, updateStudent);
// http://localhost:5000/api/edit-student/updateStudent/39
// http://localhost:5000/api/edit-student/updatePlacement/43
// http://localhost:5000/api/edit-student/updateHigherStudies/44
// module.exports = router;

const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/TNP/editStudent");
const authMiddleware = require("../../middleware/authMiddleware");

// Student update routes
router.put(
  "/updateStudent/:student_id",
  authMiddleware,
  studentController.updateStudentDetails
);

router.put(
  "/updatePlacement/:student_id",
  authMiddleware,
  studentController.updatePlacementDetails
);

router.put(
  "/updateHigherStudies/:student_id",
  authMiddleware,
  studentController.updateHigherStudiesDetails
);

module.exports = router;
