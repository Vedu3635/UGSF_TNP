const pool = require("../config/pool");

const updateStudentDetails = async (req, res) => {
  const { studentId } = req.params;
  const {
    FirstName,
    LastName,
    Email,
    Enrollment_Id,
    Enrollment_Year,
    PhoneNo,
    Program,
    Career_Choice,
    Semester,
    Class,
    Batch,
  } = req.body;

  try {
    const sql = `
      UPDATE students 
      SET 
        FirstName = ?,
        LastName = ?,
        Email = ?,
        Enrollment_Id = ?,
        Enrollment_Year = ?,
        PhoneNo = ?,
        Program = ?,
        Career_Choice = ?,
        Semester = ?,
        Class = ?,
        Batch = ?,
        updated_at = NOW()
      WHERE student_id = ?
    `;

    const values = [
      FirstName,
      LastName,
      Email,
      Enrollment_Id,
      Enrollment_Year,
      PhoneNo,
      Program,
      Career_Choice,
      Semester,
      Class,
      Batch,
      studentId,
    ];

    const result = await pool.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student details updated successfully",
    });
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student details",
      error: error.message,
    });
  }
};

const updatePlacementDetails = async (req, res) => {
  const { studentId } = req.params;
  const { 
    // Placement details
    company_name, 
    package, 
    position, 
    Status, 
    Notes,
    // Student details
    FirstName,
    LastName,
    Email,
    Enrollment_Id,
    Enrollment_Year,
    PhoneNo,
    Program 
  } = req.body;

  try {
    // Start transaction
    await pool.query('START TRANSACTION');

    // Update student details
    const studentSql = `
      UPDATE students 
      SET 
        FirstName = ?,
        LastName = ?,
        Email = ?,
        Enrollment_Id = ?,
        Enrollment_Year = ?,
        PhoneNo = ?,
        Program = ?,
        updated_at = NOW()
      WHERE student_id = ?
    `;

    const studentValues = [
      FirstName,
      LastName,
      Email,
      Enrollment_Id,
      Enrollment_Year,
      PhoneNo,
      Program,
      studentId
    ];

    const studentResult = await pool.query(studentSql, studentValues);

    // Update placement details
    const placementSql = `
      UPDATE placement_details 
      SET 
        company_name = ?,
        package = ?,
        position = ?,
        Status = ?,
        Notes = ?,
        year = YEAR(CURRENT_DATE())
      WHERE student_id = ?
    `;

    const placementValues = [company_name, package, position, Status, Notes, studentId];

    const placementResult = await pool.query(placementSql, placementValues);

    if (studentResult.affectedRows === 0 || placementResult.affectedRows === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Student or placement details not found',
      });
    }

    await pool.query('COMMIT');
    res.status(200).json({
      success: true,
      message: 'Student and placement details updated successfully',
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error updating details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update details',
      error: error.message,
    });
  }
};

const updateHigherStudiesDetails = async (req, res) => {
  const { studentId } = req.params;
  const { 
    // Higher studies details
    university_name, 
    course_name, 
    intake_year, 
    Status,
    // Student details
    FirstName,
    LastName,
    Email,
    Enrollment_Id,
    Enrollment_Year,
    PhoneNo,
    Program 
  } = req.body;

  try {
    // Start transaction
    await pool.query('START TRANSACTION');

    // Update student details
    const studentSql = `
      UPDATE students 
      SET 
        FirstName = ?,
        LastName = ?,
        Email = ?,
        Enrollment_Id = ?,
        Enrollment_Year = ?,
        PhoneNo = ?,
        Program = ?,
        updated_at = NOW()
      WHERE student_id = ?
    `;

    const studentValues = [
      FirstName,
      LastName,
      Email,
      Enrollment_Id,
      Enrollment_Year,
      PhoneNo,
      Program,
      studentId
    ];

    const studentResult = await pool.query(studentSql, studentValues);

    // Update higher studies details
    const higherStudiesSql = `
      UPDATE higher_studies_details
      SET 
        university_name = ?,
        course_name = ?,
        intake_year = ?,
        Status = ?
      WHERE student_id = ?
    `;

    const higherStudiesValues = [university_name, course_name, intake_year, Status, studentId];

    const higherStudiesResult = await pool.query(higherStudiesSql, higherStudiesValues);

    if (studentResult.affectedRows === 0 || higherStudiesResult.affectedRows === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Student or higher studies details not found',
      });
    }

    await pool.query('COMMIT');
    res.status(200).json({
      success: true,
      message: 'Student and higher studies details updated successfully',
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error updating details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update details',
      error: error.message,
    });
  }
};

module.exports = {
  updateStudentDetails,
  updatePlacementDetails,
  updateHigherStudiesDetails
};