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
              s.first_name, s.middle_name, s.last_name, s.email, s.enrollment_id, s.enrollment_year, s.phone_no, s.program, s.semester,
              h.university_name, h.course_name, h.country, h.admission_year, h.status, h.notes
            FROM students s
            JOIN higher_studies h ON s.student_id = h.student_id`;
          break;
        
        case "placements":
          sqlQuery = `
            SELECT 
              s.first_name, s.middle_name, s.last_name, s.email, s.enrollment_id, s.enrollment_year, s.phone_no, s.program, s.semester,
              p.company_name, p.position, p.placement_year, p.placement_date, p.package, p.status, p.notes
            FROM students s
            JOIN placements p ON s.student_id = p.student_id`;
          break;
        
        case "students":
        default:
          sqlQuery = `SELECT first_name, middle_name, last_name, email, enrollment_id, enrollment_year, phone_no, program, career_choice, semester, section, batch FROM students`;
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
              s.first_name, s.middle_name, s.last_name, s.email, s.enrollment_id, s.enrollment_year, s.phone_no, s.program, s.semester,
              h.university_name, h.course_name, h.country, h.admission_year, h.status, h.notes
            FROM students s
            JOIN higher_studies h ON s.student_id = h.student_id
            WHERE h.admission_year = ?`;
          break;
        
        case "placements":
          sqlQuery = `
            SELECT 
              s.first_name, s.middle_name, s.last_name, s.email, s.enrollment_id, s.enrollment_year, s.phone_no, s.program, s.semester,
              p.company_name, p.position, p.placement_year, p.placement_date, p.package, p.status, p.notes
            FROM students s
            JOIN placements p ON s.student_id = p.student_id
            WHERE p.placement_year = ?`;
          break;
        
        case "students":
        default:
          sqlQuery = `
            SELECT first_name, middle_name, last_name, email, enrollment_id, enrollment_year, phone_no, program, career_choice, semester, section, batch 
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