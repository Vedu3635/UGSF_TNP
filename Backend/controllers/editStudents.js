const pool = require("../config/pool");

exports.updateStudent = (req, res) => {
  const studentId = req.params.id;
  const {
    FirstName,
    MiddleName,
    LastName,
    Email,
    StudentId,
    Enrollment_Year,
    PhoneNo,
    Program,
    Career_Choice,
    Semester,
    Class,
    Batch,
  } = req.body;

  const query = `
    UPDATE students
    SET 
      FirstName = ?, 
      MiddleName = ?, 
      LastName = ?, 
      Email = ?, 
      StudentId = ?, 
      Enrollment_Year = ?, 
      PhoneNo = ?, 
      Program = ?, 
      Career_Choice = ?, 
      Semester = ?, 
      Class = ?, 
      Batch = ?
    WHERE Id = ?
  `;

  const values = [
    FirstName,
    MiddleName,
    LastName,
    Email,
    StudentId,
    Enrollment_Year,
    PhoneNo,
    Program,
    Career_Choice,
    Semester,
    Class,
    Batch,
    studentId,
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating student details:", err);
      return res
        .status(500)
        .json({ message: "Failed to update student details." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student details updated successfully." });
  });
};
