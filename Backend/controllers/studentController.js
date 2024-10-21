const pool = require("../config/pool");

const getJobPlacementStudents = (req, res) => {
  const query = `
    SELECT s.FirstName, s.LastName, s.Email, p.company_name, p.package, p.position
    FROM students s
    JOIN placement_details p ON s.Id = p.student_id
    WHERE s.Career_Choice = 'Job Placement';
  `;
};
