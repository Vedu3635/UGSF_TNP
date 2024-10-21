const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../config/pool"); // Update this path if pool.js is in a different location

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const filePath = req.file.path;
  uploadExcel(filePath, (error) => {
    if (error) {
      return res.status(500).json({ error: "Error processing file." });
    }
    res.json({ message: "Data stored successfully" });
  });
};

function uploadExcel(path, callback) {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(path);

    // Get the first sheet from the workbook
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format (array of arrays) similar to CSV
    const excelData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Remove the header row if present
    excelData.shift();

    // Transform the Excel data to match the SQL insert structure
    const studentsData = excelData.map((row) => [
      null, // Id (auto-incremented)
      row[0], // FirstName
      row[1], // MiddleName
      row[2], // LastName
      row[3], // Email
      row[4], // StudentId
      row[5], // PhoneNo
      row[6], // Program
      row[7], // Career_Choice
      row[8], // Semester
      row[9], // Class
      row[10], // Batch
      new Date(), // created_at
      new Date(), // updated_at
    ]);

    pool.getConnection((error, connection) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      let query =
        "INSERT INTO students (Id, FirstName, MiddleName, LastName, Email, StudentId, PhoneNo, Program, Career_Choice, Semester, Class, Batch, created_at, updated_at) VALUES ?";
      connection.query(query, [studentsData], (error, result) => {
        connection.release();
        if (error) {
          return callback(error);
        }
        fs.unlinkSync(path); // Delete the uploaded file after processing
        callback(null); // Call the callback with no error
      });
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
}
