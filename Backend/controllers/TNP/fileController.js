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
      return callback(new Error("Excel file is empty"));
    }

    // Extract headers (first row)
    const headers = excelData.shift();
    
    // Create header map for more flexible column handling
    const headerMap = {};
    Object.keys(headers).forEach(key => {
      headerMap[headers[key].toLowerCase().replace(/\s/g, '_')] = key;
    });

    // Map Excel data to appropriate tables
    const processedData = excelData
      .map((row) => {
        // Basic student data
        const studentData = {
          first_name: row[headerMap['first_name']],
          middle_name: row[headerMap['middle_name']],
          last_name: row[headerMap['last_name']],
          email: row[headerMap['email']],
          enrollment_id: row[headerMap['enrollment_id']],
          enrollment_year: row[headerMap['enrollment_year']],
          phone_no: row[headerMap['phoneno'] || headerMap['phone_no']],
          program: row[headerMap['program']],
          career_choice: row[headerMap['career_choice']],
          semester: row[headerMap['semester']],
          section: row[headerMap['section']],
          batch: row[headerMap['batch']],
          created_at: new Date(),
          updated_at: new Date()
        };

        // Check if any essential student data is missing
        const requiredFields = ['first_name', 'email', 'enrollment_id', 'career_choice'];
        for (const field of requiredFields) {
          if (!studentData[field]) {
            console.warn(`Row missing required field: ${field}`);
            return null;
          }
        }

        // Get the career choice (normalized to lowercase)
        const careerChoice = (studentData.career_choice || '').toString().toLowerCase();
        
        // Additional data based on career choice
        const additionalData = {};
        
        // For Job Placement
        if (careerChoice === 'job placement' || careerChoice === 'placement') {
          additionalData.placement = {
            company_name: row[headerMap['company_name']],
            position: row[headerMap['job_role'] || headerMap['position']],  
            placement_year: row[headerMap['placement_year']],
            placement_date:row[headerMap['placement_date']],
            package: row[headerMap['package']],
            placement_status: row[headerMap['placement_status']],
            placement_notes: row[headerMap['placement_notes']]
          };
        } 
        // For Higher Studies
        else if (careerChoice === 'higher studies' || careerChoice === 'higher_studies') {
          additionalData.higherStudies = {
            university_name: row[headerMap['university_name']],
            course_name: row[headerMap['course_name']],
            country: row[headerMap['country']],
            admission_year: row[headerMap['admission_year']],
            higher_studies_status: row[headerMap['higher_studies_status']],
            higher_studies_notes: row[headerMap['higher_studies_notes']]            
          };
        }
       
        return {
          studentData,
          careerChoice,
          additionalData
        };
      })
      .filter((item) => item !== null); // Remove invalid rows

    if (processedData.length === 0) {
      console.error("No valid data found in the Excel file.");
      return callback(new Error("No valid data found"));
    }

    pool.getConnection((error, connection) => {
      if (error) {
        console.error("Database connection error:", error);
        return callback(error);
      }

      // Using a transaction to ensure data consistency
      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        try {
          // Insert all students first
          const studentsData = processedData.map(item => [
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
            item.studentData.updated_at
          ]);

          const insertStudentsQuery = `
            INSERT INTO students 
            (first_name, middle_name, last_name, email, enrollment_id, enrollment_year, phone_no, program, career_choice, semester, section, batch, created_at, updated_at) 
            VALUES ?`;

          // Execute the query as a promise
          const insertStudentsResult = await new Promise((resolve, reject) => {
            connection.query(insertStudentsQuery, [studentsData], (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            });
          });

          // Get the inserted student IDs
          const insertId = insertStudentsResult.insertId;
          
          // Insert data into placements or higher_studies based on career_choice
          const placementStudents = [];
          const higherStudiesStudents = [];

          processedData.forEach((item, index) => {
            const studentId = insertId + index;
            
            if (item.careerChoice === 'job placement' || item.careerChoice === 'placement') {
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
            } else if (item.careerChoice === 'higher studies' || item.careerChoice === 'higher_studies') {
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

          // Insert placement data if any
          if (placementStudents.length > 0) {
            const insertPlacementsQuery = `
              INSERT INTO placements
              (student_id, company_name, position, placement_year, placement_date, package, placement_status, placement_notes)
              VALUES ?`;
            
            await new Promise((resolve, reject) => {
              connection.query(insertPlacementsQuery, [placementStudents], (error, result) => {
                if (error) {
                  return reject(error);
                }
                resolve(result);
              });
            });
          }

          // Insert higher studies data if any
          if (higherStudiesStudents.length > 0) {
            const insertHigherStudiesQuery = `
              INSERT INTO higher_studies
              (student_id, university_name, course_name, country, admission_year, higher_studies_status, higher_studies_notes)
              VALUES ?`;
            
            await new Promise((resolve, reject) => {
              connection.query(insertHigherStudiesQuery, [higherStudiesStudents], (error, result) => {
                if (error) {
                  return reject(error);
                }
                resolve(result);
              });
            });
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                callback(err);
              });
            }
            
            connection.release();
            fs.unlinkSync(path);
            callback(null);
          });
        } catch (error) {
          return connection.rollback(() => {
            connection.release();
            callback(error);
          });
        }
      });
    });
  } catch (error) {
    console.error("Excel Processing Error:", error);
    callback(error);
  }
}