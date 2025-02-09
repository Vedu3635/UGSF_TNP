const pool = require("../config/pool");

const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  // console.log(studentId);
  try {
    // Start transaction
    await pool.query("START TRANSACTION");

    // Delete from placement details
    const placementDeleteSql =
      "DELETE FROM placement_details WHERE student_id = ?";
    const placementResult = await pool.query(placementDeleteSql, [studentId]);

    // Delete from higher studies details
    const higherStudiesDeleteSql =
      "DELETE FROM higher_studies_details WHERE student_id = ?";
    const higherStudiesResult = await pool.query(higherStudiesDeleteSql, [
      studentId,
    ]);

    // Delete from students table
    const studentDeleteSql = "DELETE FROM students WHERE student_id = ?";
    const studentResult = await pool.query(studentDeleteSql, [studentId]);

    // Check if student was actually deleted
    if (studentResult.affectedRows === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await pool.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Student and associated details deleted successfully",
      deletedDetails: {
        students: studentResult.affectedRows,
        placementDetails: placementResult.affectedRows,
        higherStudiesDetails: higherStudiesResult.affectedRows,
      },
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

module.exports = {
  deleteStudent,
};
