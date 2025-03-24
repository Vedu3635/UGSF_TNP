const pool = require("../../config/pool");

const updateStudentDetails = async (req, res) => {
  const { student_id } = req.params;
  const {
    first_name,
    middle_name,
    last_name,
    email,
    enrollment_id,
    enrollment_year,
    phone_no,
    program,
    career_choice,
    semester,
    section,
    batch,
  } = req.body;

  try {
    const data = await pool.query(
      "SELECT student_id FROM students WHERE student_id = ?",
      [student_id]
    );

    const sql = `
      UPDATE students 
      SET 
        first_name = ?,
        middle_name = ?,
        last_name = ?,
        email = ?,
        enrollment_id = ?,
        enrollment_year = ?,
        phone_no = ?,
        program = ?,
        career_choice = ?,
        semester = ?,
        section = ?,
        batch = ?,
        updated_at = NOW()
      WHERE student_id = ?
    `;

    const values = [
      first_name,
      middle_name,
      last_name,
      email,
      enrollment_id,
      enrollment_year,
      phone_no,
      program,
      career_choice,
      semester,
      section,
      batch,
      student_id,
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
  const { student_id } = req.params;
  const {
    company_name,
    package,
    position,
    placement_status,
    placement_notes,
    first_name,
    middle_name,
    last_name,
    email,
    enrollment_id,
    enrollment_year,
    phone_no,
    program,
  } = req.body;

  try {
    await pool.query("START TRANSACTION");

    // Update student details
    const studentSql = `
      UPDATE students 
      SET 
        first_name = ?, middle_name = ?, last_name = ?, 
        email = ?, enrollment_id = ?, enrollment_year = ?, 
        phone_no = ?, program = ?, updated_at = NOW()
      WHERE student_id = ?
    `;

    const studentValues = [
      first_name,
      middle_name,
      last_name,
      email,
      enrollment_id,
      enrollment_year,
      phone_no,
      program,
      student_id,
    ];

    const studentResult = await pool.query(studentSql, studentValues);

    // Update placement details
    const placementSql = `
      UPDATE placements 
      SET 
        company_name = ?, package = ?, position = ?, 
        placement_status = ?, placement_notes = ?, placement_year = YEAR(CURRENT_DATE()), 
        placement_date = CURRENT_DATE()
      WHERE student_id = ?
    `;

    const placementValues = [
      company_name,
      package,
      position,
      placement_status,
      placement_notes,
      student_id,
    ];

    const placementResult = await pool.query(placementSql, placementValues);

    // Check if any rows were updated
    if (
      (studentResult.affectedRows || 0) === 0 ||
      (placementResult.affectedRows || 0) === 0
    ) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Failed to update student or placement details",
      });
    }

    await pool.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Student and placement details updated successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update details",
      error: error.message,
    });
  }
};

const updateHigherStudiesDetails = async (req, res) => {
  const { student_id } = req.params;
  const {
    // Higher studies details
    university_name,
    course_name,
    admission_year,
    higher_studies_status,
    // Student details
    first_name,
    middle_name,
    last_name,
    email,
    enrollment_id,
    enrollment_year,
    phone_no,
    program,
  } = req.body;

  try {
    // Start transaction
    await pool.query("START TRANSACTION");

    // Update student details
    const studentSql = `
      UPDATE students 
      SET 
        first_name = ?,
        middle_name =?,
        last_name = ?,
        email = ?,
        enrollment_id = ?,
        enrollment_year = ?,
        phone_no = ?,
        program = ?,
        updated_at = NOW()
      WHERE student_id = ?
    `;

    const studentValues = [
      first_name,
      middle_name,
      last_name,
      email,
      enrollment_id,
      enrollment_year,
      phone_no,
      program,
      student_id,
    ];

    const studentResult = await pool.query(studentSql, studentValues);

    // Update higher studies details
    const higherStudiesSql = `
      UPDATE higher_studies
      SET 
        university_name = ?,
        course_name = ?,
        admission_year = ?,
        higher_studies_status = ?
      WHERE student_id = ?
    `;

    const higherStudiesValues = [
      university_name,
      course_name,
      admission_year,
      higher_studies_status,
      student_id,
    ];

    const higherStudiesResult = await pool.query(
      higherStudiesSql,
      higherStudiesValues
    );

    if (
      studentResult.affectedRows === 0 ||
      higherStudiesResult.affectedRows === 0
    ) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Student or higher studies details not found",
      });
    }

    await pool.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Student and higher studies details updated successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update details",
      error: error.message,
    });
  }
};

module.exports = {
  updateStudentDetails,
  updatePlacementDetails,
  updateHigherStudiesDetails,
};
