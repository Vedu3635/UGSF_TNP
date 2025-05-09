// controllers/studentController.js
const pool = require("../../config/pool");

// Fetch job placement students
const getJobPlacementStudents = (req, res) => {
  const query = `
  SELECT 
    s.student_id, 
    s.name, 
    s.email, 
    s.enrollment_id, 
    s.enrollment_year,
    s.batch, 
    s.program, 
    p.company_name, 
    p.position, 
    p.salary_package,  
    p.placement_status  
FROM students s  
JOIN placements p ON s.student_id = p.student_id  
WHERE s.career_choice = 'Job Placement';
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
    SELECT 
    s.student_id, 
    s.name, 
    s.email, 
    s.enrollment_id, 
    s.enrollment_year,
    s.batch, 
    s.program, 
    h.university_name, 
    h.course_name, 
    h.specialization, 
    h.admission_year,  
    h.address_of_institute,
    h.city_of_institute,
    h.country_of_institute, 
    h.higher_studies_status
FROM students s
INNER JOIN higher_studies h ON s.student_id = h.student_id
WHERE s.career_choice = 'Higher Studies';

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
