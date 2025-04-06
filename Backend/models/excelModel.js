const pool = require("../config/pool");

class ExcelModel {
  static getDataFromTable(tableName) {
    // Whitelist valid table names
    const allowedTables = ["higher_studies", "placements", "students"];

    if (!allowedTables.includes(tableName)) {
      throw new Error("Invalid table name");
    }

    return new Promise((resolve, reject) => {
      let sqlQuery;

      // Fetch the required data based on the table name
      switch (tableName) {
        case "higher_studies":
          sqlQuery = `
            SELECT 
              s.name, s.email, s.enrollment_id, s.enrollment_year, s.program, s.semester,
              h.university_name, h.course_name, h.country, h.admission_year, h.higher_studies_status
            FROM students s
            JOIN higher_studies h ON s.student_id = h.student_id`;
          break;

        case "placements":
          sqlQuery = `
            SELECT 
              s.name, s.email, s.enrollment_id, s.enrollment_year, s.program, s.semester,
              p.company_name, p.position, p.package, p.placement_status
            FROM students s
            JOIN placements p ON s.student_id = p.student_id`;
          break;

        case "students":
        default:
          sqlQuery = `SELECT name, email, enrollment_id, enrollment_year, program, career_choice, semester FROM students`;
          break;
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

  static getDataFromTableByYear(tableName, year) {
    // Whitelist valid table names
    const allowedTables = ["higher_studies", "placements", "students"];

    if (!allowedTables.includes(tableName)) {
      throw new Error("Invalid table name");
    }

    return new Promise((resolve, reject) => {
      let sqlQuery;
      let params = [year];

      // Fetch the required data based on the table name with year filter
      switch (tableName) {
        case "higher_studies":
          sqlQuery = `
            SELECT 
              s.name, s.email, s.enrollment_id, s.enrollment_year s.program, s.semester,
              h.university_name, h.course_name, h.country, h.admission_year, h.higher_studies_status
            FROM students s
            JOIN higher_studies h ON s.student_id = h.student_id
            WHERE s.enrollment_year = ?`;
          break;

        case "placements":
          sqlQuery = `
            SELECT 
              s.name, s.email, s.enrollment_id, s.enrollment_year, s.program, s.semester,
              p.company_name, p.position, p.package, p.placement_status
            FROM students s
            JOIN placements p ON s.student_id = p.student_id
            WHERE s.enrollment_year = ?`;
          break;

        case "students":
        default:
          sqlQuery = `
            SELECT name, email, enrollment_id, enrollment_year, program, career_choice, semester 
            FROM students
            WHERE enrollment_year = ?`;
          break;
      }

      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(sqlQuery, params, (error, results) => {
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
