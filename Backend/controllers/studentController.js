// controllers/studentController.js
const pool = require("../config/pool");

// Fetch job placement students
const getJobPlacementStudents = (req, res) => {
  const query = `
    SELECT s.student_id, s.FirstName, s.LastName, s.PhoneNo, s.Email,s.Enrollment_Id, s.Enrollment_Year, s.Program, p.year,p.company_name, p.Status, p.package, p.position, p.Notes FROM students s JOIN placement_details p ON s.student_id = p.student_id WHERE s.Career_Choice = 'Job Placement';
  `;

  pool.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No job placement students found" });
    }

    res.json({
      // message: "Job placement students fetched successfully",
      data: results, // Send the fetched student details
      user: req.user,
    });
  });
};

// Fetch higher studies students
const getHigherStudiesStudents = (req, res) => {
  const query = `
    SELECT s.student_id, s.FirstName, s.LastName, s.Email, s.Enrollment_Year,s.Enrollment_Id, s.Enrollment_Year, s.Program, h.university_name, h.course_name, h.intake_year, h.Status
    FROM students s
    JOIN higher_studies_details h ON s.student_id = h.student_id
    WHERE s.Career_Choice = 'Higher Studies';
  `;

  pool.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No higher studies students found" });
    }

    res.json({
      // message: "Higher studies students fetched successfully",
      data: results, // Send the fetched student details
      user: req.user,
    });
  });
};

// Fetch all students (if needed)
const getAllStudents = (req, res) => {
  const query = `SELECT * FROM students`;

  pool.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }

    res.json({
      // message: "All students fetched successfully",
      data: results, // Send all student data
      user: req.user,
    });
  });
};

module.exports = {
  getAllStudents,
  getJobPlacementStudents,
  getHigherStudiesStudents,
};
