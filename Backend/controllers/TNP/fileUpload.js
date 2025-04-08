const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../../config/pool");

exports.uploadFile = (req, res) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  // console.log("uploadFile - Entering function, Request ID:", requestId);

  if (!req.file) {
    // console.log("uploadFile - No file uploaded, Request ID:", requestId);
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Extract username from req.user (JWT payload)
  const username = req.user?.username || "unknown"; // Fallback to "unknown" if not found
  if (username === "unknown") {
    console.warn(
      "uploadFile - No username found in JWT payload. Ensure user is authenticated, Request ID:",
      requestId
    );
  }
  // console.log(
  //   "uploadFile - Extracted username:",
  //   username,
  //   "Request ID:",
  //   requestId
  // );

  const filePath = req.file.path;
  // console.log(
  //   "uploadFile - Processing file at:",
  //   filePath,
  //   "Request ID:",
  //   requestId
  // );

  uploadExcel(filePath, username, requestId, (error) => {
    if (error) {
      console.error(
        "uploadFile - Excel upload error:",
        error.message,
        "Request ID:",
        requestId
      );
      return res.status(500).json({ error: "Error processing file." });
    }
    // console.log(
    //   "uploadFile - Data stored successfully, Request ID:",
    //   requestId
    // );
    res.json({ message: "Data stored successfully" });
  });
};

function uploadExcel(path, username, requestId, callback) {
  const cleanupFile = () => {
    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
        // console.log(
        //   "uploadExcel - File deleted successfully:",
        //   path,
        //   "Request ID:",
        //   requestId
        // );
      } catch (deleteError) {
        console.error(
          "uploadExcel - Error deleting file:",
          deleteError.message,
          "Request ID:",
          requestId
        );
      }
    }
  };

  try {
    // console.log(
    //   "uploadExcel - Checking file existence, Request ID:",
    //   requestId
    // );
    if (!fs.existsSync(path)) {
      console.error(
        "uploadExcel - File not found:",
        path,
        "Request ID:",
        requestId
      );
      return callback(new Error("File not found"));
    }

    // console.log("uploadExcel - Reading Excel file, Request ID:", requestId);
    const workbook = xlsx.readFile(path);
    const sheetName = "Data"; // Explicitly target the "Data" sheet
    if (!workbook.SheetNames.includes(sheetName)) {
      console.error(
        "uploadExcel - Data sheet not found, Request ID:",
        requestId
      );
      cleanupFile();
      return callback(new Error("Data sheet not found in the Excel file"));
    }
    const sheet = workbook.Sheets[sheetName];

    // Read data from the "Data" sheet
    // console.log(
    //   "uploadExcel - Converting sheet to JSON, Request ID:",
    //   requestId
    // );
    const excelData = xlsx.utils.sheet_to_json(sheet, { header: "A" });

    if (excelData.length === 0) {
      console.error(
        "uploadExcel - Excel file is empty, Request ID:",
        requestId
      );
      cleanupFile();
      return callback(new Error("Excel file is empty"));
    }

    // Extract headers from the first row
    // console.log("uploadExcel - Extracting headers, Request ID:", requestId);
    const headers = excelData.shift();
    const headerMap = {};
    Object.keys(headers).forEach((key) => {
      headerMap[headers[key].toLowerCase().replace(/\s/g, "_")] = key;
    });

    // Map Excel data to appropriate tables
    // console.log("uploadExcel - Processing data rows, Request ID:", requestId);
    const processedData = excelData
      .map((row) => {
        const studentData = {
          name: row[headerMap["name"]],
          email: row[headerMap["email"]],
          enrollment_id: row[headerMap["enrollment_id"]],
          enrollment_year: row[headerMap["enrollment_year"]],
          batch: row[headerMap["batch"]],
          program: row[headerMap["program"]],
          career_choice: row[headerMap["career_choice"]],
          semester: row[headerMap["semester"]],
          created_at: new Date(),
          updated_by: username,
          updated_at: new Date(),
        };

        // Check for required fields
        const requiredFields = [
          "name",
          "email",
          "enrollment_id",
          "enrollment_year",
          "batch",
          "career_choice",
        ];
        for (const field of requiredFields) {
          if (!studentData[field]) {
            console.warn(
              `uploadExcel - Row missing required field: ${field}, Request ID:`,
              requestId
            );
            return null;
          }
        }

        const careerChoice = (studentData.career_choice || "")
          .toString()
          .toLowerCase();
        const additionalData = {};

        if (careerChoice === "job placement" || careerChoice === "placement") {
          additionalData.placement = {
            company_name: row[headerMap["company_name"]],
            position: row[headerMap["position"]],
            salary_package: row[headerMap["salary_package"]],
            placement_status: row[headerMap["placement_status"]],
          };
        } else if (
          careerChoice === "higher studies" ||
          careerChoice === "higher_studies"
        ) {
          additionalData.higherStudies = {
            university_name: row[headerMap["university_name"]],
            course_name: row[headerMap["course_name"]],
            specialization: row[headerMap["specialization"]],
            admission_year: row[headerMap["admission_year"]],
            address_of_institute: row[headerMap["address_of_institute"]],
            city_of_institute: row[headerMap["city_of_institute"]],
            country_of_institute: row[headerMap["country_of_institute"]],
            higher_studies_status: row[headerMap["higher_studies_status"]],
          };
        }

        return { studentData, careerChoice, additionalData };
      })
      .filter((item) => item !== null);

    if (processedData.length === 0) {
      console.error(
        "uploadExcel - No valid data found, Request ID:",
        requestId
      );
      cleanupFile();
      return callback(new Error("No valid data found"));
    }

    // console.log(
    //   "uploadExcel - Acquiring database connection, Request ID:",
    //   requestId
    // );
    pool.getConnection((error, connection) => {
      if (error) {
        console.error(
          "uploadExcel - Database connection error:",
          error.message,
          "Request ID:",
          requestId
        );
        cleanupFile();
        return callback(error);
      }

      // console.log("uploadExcel - Starting transaction, Request ID:", requestId);
      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          console.error(
            "uploadExcel - Transaction begin error:",
            err.message,
            "Request ID:",
            requestId
          );
          cleanupFile();
          return callback(err);
        }

        try {
          // console.log(
          //   "uploadExcel - Preparing students upsert query, Request ID:",
          //   requestId
          // );
          const studentsData = processedData.map((item) => [
            item.studentData.name,
            item.studentData.email,
            item.studentData.enrollment_id,
            item.studentData.enrollment_year,
            item.studentData.batch,
            item.studentData.program,
            item.studentData.career_choice,
            item.studentData.semester,
            item.studentData.created_at,
            item.studentData.updated_by,
            item.studentData.updated_at,
          ]);

          const upsertStudentsQuery = `
            INSERT INTO students 
            (name, email, enrollment_id, enrollment_year, batch, program, career_choice, semester, created_at, updated_by, updated_at) 
            VALUES ?
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            email = VALUES(email),
            enrollment_year = VALUES(enrollment_year), 
            batch = VALUES(batch), 
            program = VALUES(program),
            career_choice = VALUES(career_choice),
            semester = VALUES(semester), 
            updated_by = VALUES(updated_by),  
            updated_at = VALUES(updated_at)
          `;

          await new Promise((resolve, reject) => {
            connection.query(
              upsertStudentsQuery,
              [studentsData],
              (error, result) => {
                if (error) return reject(error);
                // console.log(
                //   "uploadExcel - Students upsert result:",
                //   result,
                //   "Request ID:",
                //   requestId
                // );
                resolve(result);
              }
            );
          });

          // console.log(
          //   "uploadExcel - Fetching student IDs, Request ID:",
          //   requestId
          // );
          const enrollmentIds = processedData.map(
            (item) => item.studentData.enrollment_id
          );
          const studentIdsResult = await new Promise((resolve, reject) => {
            connection.query(
              "SELECT student_id, enrollment_id FROM students WHERE enrollment_id IN (?)",
              [enrollmentIds],
              (error, results) => {
                if (error) return reject(error);
                // console.log(
                //   "uploadExcel - Student IDs result:",
                //   results,
                //   "Request ID:",
                //   requestId
                // );
                resolve(results);
              }
            );
          });

          const studentIdMap = new Map(
            studentIdsResult.map((row) => [row.enrollment_id, row.student_id])
          );

          const placementStudents = [];
          const higherStudiesStudents = [];

          // console.log(
          //   "uploadExcel - Mapping additional data, Request ID:",
          //   requestId
          // );
          processedData.forEach((item) => {
            const studentId = studentIdMap.get(item.studentData.enrollment_id);

            if (
              item.careerChoice === "job placement" ||
              item.careerChoice === "placement"
            ) {
              const placement = item.additionalData.placement;
              placementStudents.push([
                studentId,
                placement.company_name,
                placement.position,
                placement.salary_package,
                placement.placement_status,
              ]);
            } else if (
              item.careerChoice === "higher studies" ||
              item.careerChoice === "higher_studies"
            ) {
              const higherStudy = item.additionalData.higherStudies;
              higherStudiesStudents.push([
                studentId,
                higherStudy.university_name,
                higherStudy.course_name,
                higherStudy.specialization,
                higherStudy.admission_year,
                higherStudy.address_of_institute,
                higherStudy.city_of_institute,
                higherStudy.country_of_institute,
                higherStudy.higher_studies_status,
              ]);
            }
          });

          if (placementStudents.length > 0) {
            // console.log(
            //   "uploadExcel - Preparing placements upsert, Request ID:",
            //   requestId
            // );
            const upsertPlacementsQuery = `
              INSERT INTO placements
              (student_id, company_name, position, salary_package, placement_status)
              VALUES ?
              ON DUPLICATE KEY UPDATE
              company_name = VALUES(company_name),
              position = VALUES(position),
              salary_package = VALUES(salary_package),
              placement_status = VALUES(placement_status)
            `;
            await new Promise((resolve, reject) => {
              connection.query(
                upsertPlacementsQuery,
                [placementStudents],
                (error, result) => {
                  if (error) return reject(error);
                  // console.log(
                  //   "uploadExcel - Placements upsert result:",
                  //   result,
                  //   "Request ID:",
                  //   requestId
                  // );
                  resolve(result);
                }
              );
            });
          }

          if (higherStudiesStudents.length > 0) {
            // console.log(
            //   "uploadExcel - Preparing higher studies upsert, Request ID:",
            //   requestId
            // );
            const upsertHigherStudiesQuery = `
              INSERT INTO higher_studies
              (student_id, university_name, course_name, specialization, admission_year, address_of_institute, city_of_institute, country_of_institute, higher_studies_status)
              VALUES ?
              ON DUPLICATE KEY UPDATE
              university_name = VALUES(university_name),
              course_name = VALUES(course_name),
              specialization = VALUES(specialization),
              admission_year = VALUES(admission_year),
              address_of_institute = VALUES(address_of_institute),
              city_of_institute = VALUES(city_of_institute), 
              country_of_institute = VALUES(country_of_institute),
              higher_studies_status = VALUES(higher_studies_status)
            `;
            await new Promise((resolve, reject) => {
              connection.query(
                upsertHigherStudiesQuery,
                [higherStudiesStudents],
                (error, result) => {
                  if (error) return reject(error);
                  // console.log(
                  //   "uploadExcel - Higher studies upsert result:",
                  //   result,
                  //   "Request ID:",
                  //   requestId
                  // );
                  resolve(result);
                }
              );
            });
          }

          // console.log(
          //   "uploadExcel - Committing transaction, Request ID:",
          //   requestId
          // );
          connection.commit((commitErr) => {
            if (commitErr) {
              console.error(
                "uploadExcel - Commit error:",
                commitErr.message,
                "Request ID:",
                requestId
              );
              return connection.rollback(() => {
                connection.release();
                cleanupFile();
                callback(commitErr);
              });
            }
            // console.log(
            //   "uploadExcel - Transaction committed, Request ID:",
            //   requestId
            // );
            connection.release();
            cleanupFile();
            callback(null);
          });
        } catch (error) {
          console.error(
            "uploadExcel - Transaction error:",
            error.message,
            "Request ID:",
            requestId
          );
          connection.rollback(() => {
            connection.release();
            cleanupFile();
            callback(error);
          });
        }
      });
    });
  } catch (error) {
    console.error(
      "uploadExcel - Excel processing error:",
      error.message,
      "Request ID:",
      requestId
    );
    cleanupFile();
    callback(error);
  }
}
