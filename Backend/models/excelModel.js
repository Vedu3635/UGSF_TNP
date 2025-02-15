// models/excelModel.js
const pool = require("../config/pool");

class ExcelModel {
  static getDataFromTable(tableName) {
    // Whitelist of allowed tables for security
    const allowedTables = [
      "higher_studies_details",
      "placement_details",
      "students",
    ];
    if (!allowedTables.includes(tableName)) {
      throw new Error("Invalid table name");
    }

    return new Promise((resolve, reject) => {
      let sqlQuery;

      // Determine the appropriate query based on tableName
      if (tableName === "higher_studies_details") {
        sqlQuery = `SELECT * FROM students s JOIN higher_studies_details h ON s.student_id = h.student_id`;
      } else if (tableName === "placement_details") {
        sqlQuery = `SELECT * FROM students s JOIN placement_details p ON s.student_id = p.student_id`;
      } else {
        sqlQuery = `SELECT * FROM students`;
      }

      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(sqlQuery, (error, results) => {
          connection.release();

          if (error) {
            reject(error);
            return;
          }

          resolve(results);
        });
      });
    });
  }
}

module.exports = ExcelModel;
