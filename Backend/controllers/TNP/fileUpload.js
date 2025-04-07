const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../../config/pool");

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const filePath = req.file.path;
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
    const sheetName = "Data"; // Explicitly target the "Data" sheet
    if (!workbook.SheetNames.includes(sheetName)) {
      cleanupFile();
      return callback(new Error("Data sheet not found in the Excel file"));
    }
    const sheet = workbook.Sheets[sheetName];

    // Read data from the "Data" sheet
    const excelData = xlsx.utils.sheet_to_json(sheet, { header: "A" });

    if (excelData.length === 0) {
      console.error("Excel file is empty.");
      cleanupFile();
      return callback(new Error("Excel file is empty"));
    }

    // Extract headers from the first row
    const headers = excelData.shift();
    const headerMap = {};
    Object.keys(headers).forEach((key) => {
      headerMap[headers[key].toLowerCase().replace(/\s/g, "_")] = key;
    });

    // Map Excel data to appropriate tables
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
            console.warn(`Row missing required field: ${field}`);
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
            package: row[headerMap["package"]],
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

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          cleanupFile();
          return callback(err);
        }

        try {
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
            item.studentData.updated_at,
          ]);

          const upsertStudentsQuery = `
            INSERT INTO students 
            (name, email, enrollment_id, enrollment_year, batch, program, career_choice, semester, created_at, updated_at) 
            VALUES ?
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            email = VALUES(email),
            enrollment_year = VALUES(enrollment_year), 
            batch = VALUES(batch), 
            program = VALUES(program),
            career_choice = VALUES(career_choice),
            semester = VALUES(semester),
            updated_at = VALUES(updated_at)
          `;

          await new Promise((resolve, reject) => {
            connection.query(
              upsertStudentsQuery,
              [studentsData],
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
          });

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

          const studentIdMap = new Map(
            studentIdsResult.map((row) => [row.enrollment_id, row.student_id])
          );

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
                placement.package,
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
            const upsertPlacementsQuery = `
              INSERT INTO placements
              (student_id, company_name, position, package, placement_status)
              VALUES ?
              ON DUPLICATE KEY UPDATE
              company_name = VALUES(company_name),
              position = VALUES(position),
              package = VALUES(package),
              placement_status = VALUES(placement_status)
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

          if (higherStudiesStudents.length > 0) {
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
                  resolve(result);
                }
              );
            });
          }

          connection.commit((commitErr) => {
            if (commitErr) {
              console.error("Commit error:", commitErr);
              return connection.rollback(() => {
                connection.release();
                cleanupFile();
                callback(commitErr);
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
