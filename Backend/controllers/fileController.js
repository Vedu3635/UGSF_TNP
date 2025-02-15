const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../config/pool"); // Update this path if pool.js is in a different location

exports.uploadFile = (req, res) => {
  console.log("File received:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const filePath = req.file.path;
  console.log("File path:", filePath); // Debugging
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
      console.error("File not found:", path);
      return callback(new Error("File not found"));
    }

    console.log("Reading Excel file:", path);

    const workbook = xlsx.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (excelData.length === 0) {
      console.error("Excel file is empty.");
      return callback(new Error("Excel file is empty"));
    }

    // Remove headers
    excelData.shift();

    // Ensure correct data mapping
    const studentsData = excelData.map((row) => {
      if (row.length < 12) {
        console.error("Row has missing values:", row);
        return null; // Skip invalid rows
      }

      return [
        row[0],  // FirstName
        row[1],  // MiddleName
        row[2],  // LastName
        row[3],  // Email
        row[4],  // Enrollment_Id
        row[5],  // Enrollment_Year
        row[6],  // PhoneNo
        row[7],  // Program
        row[8],  // Career_Choice
        row[9],  // Semester
        row[10], // Class
        row[11], // Batch
        new Date(), // created_at
        new Date()  // updated_at
      ];
    }).filter(row => row !== null); // Remove invalid rows

    if (studentsData.length === 0) {
      console.error("No valid data found in the Excel file.");
      return callback(new Error("No valid data found"));
    }

    pool.getConnection((error, connection) => {
      if (error) {
        console.error("Database connection error:", error);
        return callback(error);
      }

      const query = `
        INSERT INTO students 
        (FirstName, MiddleName, LastName, Email, Enrollment_Id, Enrollment_Year, 
        PhoneNo, Program, Career_Choice, Semester, Class, Batch, created_at, updated_at) 
        VALUES ?`;

      connection.query(query, [studentsData], (error, result) => {
        connection.release();
        if (error) {
          console.error("SQL Insert Error:", error.sqlMessage);
          return callback(error);
        }

        console.log("Inserted Rows:", result.affectedRows);
        fs.unlinkSync(path);
        callback(null);
      });
    });
  } catch (error) {
    console.error("Excel Processing Error:", error);
    callback(error);
  }
}

