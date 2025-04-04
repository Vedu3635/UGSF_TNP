const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../../config/pool");

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const filePath = req.file.path;
  // console.log(`Starting upload for file: ${filePath}`);
  uploadExcel(filePath, (error) => {
    if (error) {
      console.error("Excel upload error:", error);
      return res.status(500).json({ error: "Error processing file." });
    }
    res.json({ message: "Data stored successfully" });
  });
};

function uploadExcel(path, callback) {
  const cleanupFile = () => {
    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
        // console.log(`File deleted: ${path}`);
      } catch (deleteError) {
        console.error(`Error deleting file ${path}:`, deleteError);
      }
    }
  };

  try {
    if (!fs.existsSync(path)) {
      return callback(new Error("File not found"));
    }

    const workbook = xlsx.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Use header: true to get data as objects with column headers as keys
    const excelData = xlsx.utils.sheet_to_json(sheet, { header: "A" });

    if (excelData.length === 0) {
      console.error("Excel file is empty.");
      cleanupFile();
      return callback(new Error("Excel file is empty"));
    }

    // Create header map for more flexible column handling
    const headers = excelData.shift();
    const headerMap = {};
    Object.keys(headers).forEach((key) => {
      headerMap[headers[key].toLowerCase().replace(/\s/g, "_")] = key;
    });

    // Map Excel data to appropriate tables
    const processedData = excelData
      // Basic student data
      .map((row) => {
        const studentData = {
          first_name: row[headerMap["first_name"]],
          middle_name: row[headerMap["middle_name"]],
          last_name: row[headerMap["last_name"]],
          email: row[headerMap["email"]],
          enrollment_id: row[headerMap["enrollment_id"]],
          enrollment_year: row[headerMap["enrollment_year"]],
          phone_no: row[headerMap["phoneno"] || headerMap["phone_no"]],
          program: row[headerMap["program"]],
          career_choice: row[headerMap["career_choice"]],
          semester: row[headerMap["semester"]],
          section: row[headerMap["section"]],
          batch: row[headerMap["batch"]],
          created_at: new Date(),
          updated_at: new Date(),
        };

        // Check if any essential student data is missing
        const requiredFields = [
          "first_name",
          "email",
          "enrollment_id",
          "career_choice",
        ];
        for (const field of requiredFields) {
          if (!studentData[field]) {
            console.warn(`Row missing required field: ${field}`);
            return null;
          }
        }

        // Get the career choice (normalized to lowercase)
        const careerChoice = (studentData.career_choice || "")
          .toString()
          .toLowerCase();

        // Additional data based on career choice
        const additionalData = {};

        // For Job Placement
        if (careerChoice === "job placement" || careerChoice === "placement") {
          additionalData.placement = {
            company_name: row[headerMap["company_name"]],
            position: row[headerMap["position"]],
            placement_year: row[headerMap["placement_year"]],
            placement_date: row[headerMap["placement_date"]],
            package: row[headerMap["package"]],
            placement_status: row[headerMap["placement_status"]],
            placement_notes: row[headerMap["placement_notes"]],
          };
        }

        // For Higher Studies
        else if (
          careerChoice === "higher studies" ||
          careerChoice === "higher_studies"
        ) {
          additionalData.higherStudies = {
            university_name: row[headerMap["university_name"]],
            course_name: row[headerMap["course_name"]],
            country: row[headerMap["country"]],
            admission_year: row[headerMap["admission_year"]],
            higher_studies_status: row[headerMap["higher_studies_status"]],
            higher_studies_notes: row[headerMap["higher_studies_notes"]],
          };
        }

        return { studentData, careerChoice, additionalData };
      })
      .filter((item) => item !== null);

    if (processedData.length === 0) {
      console.error("No valid data found in the Excel file.");
      cleanupFile();
      return callback(new Error("No valid data found"));
    }

    pool.getConnection((error, connection) => {
      if (error) {
        console.error("Database connection error:", error);
        cleanupFile();
        return callback(error);
      }

      // Using a transaction to ensure data consistency
      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          cleanupFile();
          return callback(err);
        }

        try {
          // Insert all students first
          const studentsData = processedData.map((item) => [
            item.studentData.first_name,
            item.studentData.middle_name,
            item.studentData.last_name,
            item.studentData.email,
            item.studentData.enrollment_id,
            item.studentData.enrollment_year,
            item.studentData.phone_no,
            item.studentData.program,
            item.studentData.career_choice,
            item.studentData.semester,
            item.studentData.section,
            item.studentData.batch,
            item.studentData.created_at,
            item.studentData.updated_at,
          ]);

          const upsertStudentsQuery = `
            INSERT INTO students 
            (first_name, middle_name, last_name, email, enrollment_id, enrollment_year, phone_no, program, career_choice, semester, section, batch, created_at, updated_at) 
            VALUES ?
            ON DUPLICATE KEY UPDATE
            first_name = VALUES(first_name),
            middle_name = VALUES(middle_name),
            last_name = VALUES(last_name),
            email = VALUES(email),
            enrollment_year = VALUES(enrollment_year),
            phone_no = VALUES(phone_no),
            program = VALUES(program),
            career_choice = VALUES(career_choice),
            semester = VALUES(semester),
            section = VALUES(section),
            batch = VALUES(batch),
            updated_at = VALUES(updated_at)
          `;

          const upsertStudentsResult = await new Promise((resolve, reject) => {
            connection.query(
              upsertStudentsQuery,
              [studentsData],
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
          });

          // Fetch student_ids based on enrollment_id
          const enrollmentIds = processedData.map(
            (item) => item.studentData.enrollment_id
          );
          const studentIdsResult = await new Promise((resolve, reject) => {
            connection.query(
              "SELECT student_id, enrollment_id FROM students WHERE enrollment_id IN (?)",
              [enrollmentIds],
              (error, results) => {
                if (error) return reject(error);
                resolve(results);
              }
            );
          });

          // Get the inserted student IDs
          const studentIdMap = new Map(
            studentIdsResult.map((row) => [row.enrollment_id, row.student_id])
          );

          // Insert data into placements or higher_studies based on career_choice
          const placementStudents = [];
          const higherStudiesStudents = [];

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
                placement.placement_year,
                placement.placement_date,
                placement.package,
                placement.placement_status,
                placement.placement_notes,
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
                higherStudy.country,
                higherStudy.admission_year,
                higherStudy.higher_studies_status,
                higherStudy.higher_studies_notes,
              ]);
            }
          });

          // Upsert placements (one per student_id)
          if (placementStudents.length > 0) {
            const upsertPlacementsQuery = `
              INSERT INTO placements
              (student_id, company_name, position, placement_year, placement_date, package, placement_status, placement_notes)
              VALUES ?
              ON DUPLICATE KEY UPDATE
              company_name = VALUES(company_name),
              position = VALUES(position),
              placement_year = VALUES(placement_year),
              placement_date = VALUES(placement_date),
              package = VALUES(package),
              placement_status = VALUES(placement_status),
              placement_notes = VALUES(placement_notes)
            `;
            await new Promise((resolve, reject) => {
              connection.query(
                upsertPlacementsQuery,
                [placementStudents],
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
                }
              );
            });
          }

          // Upsert higher studies (one per student_id, adjust if multiple allowed)
          if (higherStudiesStudents.length > 0) {
            const upsertHigherStudiesQuery = `
              INSERT INTO higher_studies
              (student_id, university_name, course_name, country, admission_year, higher_studies_status, higher_studies_notes)
              VALUES ?
              ON DUPLICATE KEY UPDATE
              university_name = VALUES(university_name),
              course_name = VALUES(course_name),
              country = VALUES(country),
              admission_year = VALUES(admission_year),
              higher_studies_status = VALUES(higher_studies_status),
              higher_studies_notes = VALUES(higher_studies_notes)
            `;
            await new Promise((resolve, reject) => {
              connection.query(
                upsertHigherStudiesQuery,
                [higherStudiesStudents],
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
                }
              );
            });
          }

          connection.commit((err) => {
            if (err) {
              console.error("Commit error:", commitErr);
              return connection.rollback(() => {
                connection.release();
                cleanupFile();
                callback(err);
              });
            }
            connection.release();
            cleanupFile();
            callback(null);
          });
        } catch (error) {
          connection.rollback(() => {
            connection.release();
            cleanupFile();
            callback(error);
          });
        }
      });
    });
  } catch (error) {
    console.error("Excel Processing Error:", error);
    cleanupFile();
    callback(error);
  }
}
