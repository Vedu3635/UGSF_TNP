const pool = require("../../config/pool");
const util = require("util");

const query = util.promisify(pool.query).bind(pool);

const updateStudentDetails = async (req, res) => {
  const { student_id } = req.params;
  const {
    name,
    email,
    enrollment_id,
    enrollment_year,
    batch,
    program,
    career_choice,
    semester,
  } = req.body;

  // console.log(
  //   "updateStudentDetails - Entering function, Request ID:",
  //   Math.random().toString(36).substr(2, 9)
  // );
  // console.log("updateStudentDetails - req.user:", req.user);
  // console.log("updateStudentDetails - Request body:", req.body);
  // console.log("updateStudentDetails - Student ID:", student_id);

  if (!req.user || !req.user.username) {
    // console.log("Unauthorized: No valid user found");
    return res.status(401).json({ error: "Unauthorized: No valid user found" });
  }
  const updated_by = req.user.username;
  // console.log("updateStudentDetails - updated_by:", updated_by);

  try {
    // console.log("updateStudentDetails - Checking student existence");
    const rows = await query(
      "SELECT student_id FROM students WHERE student_id = ?",
      [parseInt(student_id)]
    );
    // console.log("updateStudentDetails - Student check result:", rows);

    if (!rows || rows.length === 0) {
      // console.log("updateStudentDetails - Student not found in initial check");
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // console.log("updateStudentDetails - Preparing update query");
    const sql = `
      UPDATE students 
      SET 
        name = ?, email = ?, enrollment_id = ?, enrollment_year = ?, batch = ?, 
        program = ?, career_choice = ?, semester = ?, updated_by = ?
      WHERE student_id = ?
    `;
    const values = [
      name || "",
      email || "",
      enrollment_id || "",
      enrollment_year || null,
      batch || null,
      program || "",
      career_choice || "Job Placement",
      semester || "SEM 4",
      updated_by,
      parseInt(student_id),
    ];
    // console.log("updateStudentDetails - Query values:", values);

    const result = await query(sql, values);
    // console.log("updateStudentDetails - Update result:", result);

    if (result.affectedRows === 0) {
      // console.log("updateStudentDetails - No rows updated");
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // console.log("updateStudentDetails - Success");
    res
      .status(200)
      .json({ success: true, message: "Student details updated successfully" });
  } catch (error) {
    console.error("updateStudentDetails - Error:", error.message);
    console.error("updateStudentDetails - Stack:", error.stack);
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
    salary_package, // 'package' is a reserved word, aliasing to 'pkg'
    position,
    placement_status,
    name,
    email,
    enrollment_id,
    enrollment_year,
    batch,
    program,
  } = req.body || {};

  const requestId = Math.random().toString(36).substr(2, 9);
  // console.log(
  //   "updatePlacementDetails - Entering function, Request ID:",
  //   requestId
  // );
  // console.log("updatePlacementDetails - req.user:", req.user);
  // console.log("updatePlacementDetails - Request body:", req.body);
  // console.log("updatePlacementDetails - Student ID:", student_id);

  if (!req.user || !req.user.username) {
    // console.log("Unauthorized: No valid user found, Request ID:", requestId);
    return res.status(401).json({ error: "Unauthorized: No valid user found" });
  }
  const updated_by = req.user.username;
  // console.log("updatePlacementDetails - updated_by:", updated_by);

  try {
    // console.log(
    //   "updatePlacementDetails - Starting transaction, Request ID:",
    //   requestId
    // );
    await query("START TRANSACTION");

    // console.log(
    //   "updatePlacementDetails - Preparing student update query, Request ID:",
    //   requestId
    // );
    const studentSql = `
      UPDATE students 
      SET 
        name = ?, email = ?, enrollment_id = ?, enrollment_year = ?, batch = ?, 
        program = ?, updated_by = ?, updated_at = NOW()
      WHERE student_id = ?
    `;
    const studentValues = [
      name || "",
      email || "",
      enrollment_id || "",
      enrollment_year || null,
      batch || null,
      program || "",
      updated_by,
      parseInt(student_id),
    ];
    // console.log(
    //   "updatePlacementDetails - Student query values:",
    //   studentValues,
    //   "Request ID:",
    //   requestId
    // );

    const studentResult = await query(studentSql, studentValues);
    // console.log(
    //   "updatePlacementDetails - Student update result:",
    //   studentResult,
    //   "Request ID:",
    //   requestId
    // );

    // console.log(
    //   "updatePlacementDetails - Preparing placement update query, Request ID:",
    //   requestId
    // );
    const placementSql = `
      UPDATE placements 
      SET 
        company_name = ?, salary_package = ?, position = ?, placement_status = ?
      WHERE student_id = ?
    `;
    const placementValues = [
      company_name || "",
      salary_package || "", // Using 'pkg' alias
      position || "",
      placement_status || "",
      parseInt(student_id),
    ];
    // console.log(
    //   "updatePlacementDetails - Placement query values:",
    //   placementValues,
    //   "Request ID:",
    //   requestId
    // );

    const placementResult = await query(placementSql, placementValues);
    // console.log(
    //   "updatePlacementDetails - Placement update result:",
    //   placementResult,
    //   "Request ID:",
    //   requestId
    // );

    // Check if any rows were updated
    if (
      (studentResult.affectedRows || 0) === 0 ||
      (placementResult.affectedRows || 0) === 0
    ) {
      // console.log(
      //   "updatePlacementDetails - No rows updated, rolling back, Request ID:",
      //   requestId
      // );
      await query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Failed to update student or placement details",
      });
    }

    // console.log(
    //   "updatePlacementDetails - Committing transaction, Request ID:",
    //   requestId
    // );
    await query("COMMIT");
    // console.log(
    //   "updatePlacementDetails - Sending response, Request ID:",
    //   requestId
    // );
    res.status(200).json({
      success: true,
      message: "Student and placement details updated successfully",
    });
  } catch (error) {
    // console.log(
    //   "updatePlacementDetails - Error occurred, rolling back, Request ID:",
    //   requestId
    // );
    await query("ROLLBACK");
    console.error(
      "updatePlacementDetails - Error:",
      error.message,
      "Request ID:",
      requestId
    );
    console.error(
      "updatePlacementDetails - Stack:",
      error.stack,
      "Request ID:",
      requestId
    );
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
    specialization,
    admission_year,
    address_of_institute,
    city_of_institute,
    country_of_institute,
    higher_studies_status,
    // Student details
    name,
    email,
    enrollment_id,
    enrollment_year,
    batch,
    program,
  } = req.body || {};

  const requestId = Math.random().toString(36).substr(2, 9);
  // console.log(
  //   "updateHigherStudiesDetails - Entering function, Request ID:",
  //   requestId
  // );
  // console.log("updateHigherStudiesDetails - req.user:", req.user);
  // console.log("updateHigherStudiesDetails - Request body:", req.body);
  // console.log("updateHigherStudiesDetails - Student ID:", student_id);

  if (!req.user || !req.user.username) {
    // console.log("Unauthorized: No valid user found, Request ID:", requestId);
    return res.status(401).json({ error: "Unauthorized: No valid user found" });
  }
  const updated_by = req.user.username;
  // console.log("updateHigherStudiesDetails - updated_by:", updated_by);

  try {
    // console.log(
    //   "updateHigherStudiesDetails - Starting transaction, Request ID:",
    //   requestId
    // );
    await query("START TRANSACTION");

    // console.log(
    //   "updateHigherStudiesDetails - Preparing student update query, Request ID:",
    //   requestId
    // );
    const studentSql = `
      UPDATE students 
      SET 
        name = ?, email = ?, enrollment_id = ?, enrollment_year = ?, batch = ?, 
        program = ?, updated_by = ?, updated_at = NOW()
      WHERE student_id = ?
    `;
    const studentValues = [
      name || "",
      email || "",
      enrollment_id || "",
      enrollment_year || null,
      batch || null,
      program || "",
      updated_by,
      parseInt(student_id),
    ];
    // console.log(
    //   "updateHigherStudiesDetails - Student query values:",
    //   studentValues,
    //   "Request ID:",
    //   requestId
    // );

    const studentResult = await query(studentSql, studentValues);
    // console.log(
    //   "updateHigherStudiesDetails - Student update result:",
    //   studentResult,
    //   "Request ID:",
    //   requestId
    // );

    // console.log(
    //   "updateHigherStudiesDetails - Preparing higher studies update query, Request ID:",
    //   requestId
    // );
    const higherStudiesSql = `
      UPDATE higher_studies
      SET 
        university_name = ?, course_name = ?, specialization = ?, admission_year = ?,
        address_of_institute = ?, city_of_institute = ?, country_of_institute = ?, higher_studies_status = ?
      WHERE student_id = ?
    `;
    const higherStudiesValues = [
      university_name || "",
      course_name || "",
      specialization || "",
      admission_year || null,
      address_of_institute || "",
      city_of_institute || "",
      country_of_institute || "",
      higher_studies_status || "",
      parseInt(student_id),
    ];
    // console.log(
    //   "updateHigherStudiesDetails - Higher studies query values:",
    //   higherStudiesValues,
    //   "Request ID:",
    //   requestId
    // );

    const higherStudiesResult = await query(
      higherStudiesSql,
      higherStudiesValues
    );
    // console.log(
    //   "updateHigherStudiesDetails - Higher studies update result:",
    //   higherStudiesResult,
    //   "Request ID:",
    //   requestId
    // );

    if (
      (studentResult.affectedRows || 0) === 0 ||
      (higherStudiesResult.affectedRows || 0) === 0
    ) {
      // console.log(
      //   "updateHigherStudiesDetails - No rows updated, rolling back, Request ID:",
      //   requestId
      // );
      await query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Student or higher studies details not found",
      });
    }

    // console.log(
    //   "updateHigherStudiesDetails - Committing transaction, Request ID:",
    //   requestId
    // );
    await query("COMMIT");
    // console.log(
    //   "updateHigherStudiesDetails - Sending response, Request ID:",
    //   requestId,
    //   {
    //     success: true,
    //     message: "Student and higher studies details updated successfully",
    //   }
    // );
    res.status(200).json({
      success: true,
      message: "Student and higher studies details updated successfully",
    });
  } catch (error) {
    // console.log(
    //   "updateHigherStudiesDetails - Error occurred, rolling back, Request ID:",
    //   requestId
    // );
    await query("ROLLBACK");
    console.error(
      "updateHigherStudiesDetails - Error:",
      error.message,
      "Request ID:",
      requestId
    );
    console.error(
      "updateHigherStudiesDetails - Stack:",
      error.stack,
      "Request ID:",
      requestId
    );
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
