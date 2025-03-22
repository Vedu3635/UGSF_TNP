const ExcelJS = require('exceljs');
const pool = require('../../config/pool');

const downloadCompanies = async (req, res) => {
  try {
    const { type } = req.query; // 'upcoming' or 'visited'
    
    if (!type || (type !== 'upcoming' && type !== 'visited')) {
      return res.status(400).json({ error: 'Please specify a valid type: upcoming or visited' });
    }
    
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Query based on type
    let query;
    if (type === 'upcoming') {
      query = `
        SELECT * FROM companies 
        WHERE hiring_date >= '${currentDate}' 
        ORDER BY hiring_date ASC
      `;
    } else { // visited
      query = `
        SELECT * FROM companies 
        WHERE hiring_date < '${currentDate}' 
        ORDER BY hiring_date DESC
      `;
    }
    
    // Execute query using your pool configuration
    pool.query(query, (err, companies) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      
      if (companies.length === 0) {
        return res.status(404).json({ error: `No ${type} companies found` });
      }
      
      // Create Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${type.charAt(0).toUpperCase() + type.slice(1)} Companies`);
      
      // Define columns
      worksheet.columns = [
        { header: 'Company Name', key: 'company_name', width: 20 },
        { header: 'Industry Domain', key: 'industry_domain', width: 20 },
        { header: 'Website URL', key: 'website_url', width: 30 },
        { header: 'Contact Name', key: 'contact_name', width: 20 },
        { header: 'Contact Email', key: 'contact_email', width: 25 },
        { header: 'Contact Phone', key: 'contact_phone', width: 15 },
        { header: 'Job Roles', key: 'job_roles', width: 25 },
        { header: 'Positions', key: 'positions', width: 10 },
        { header: 'Package Min (₹)', key: 'package_min', width: 15 },
        { header: 'Package Max (₹)', key: 'package_max', width: 15 },
        { header: 'Employment Type', key: 'employment_type', width: 20 },
        { header: 'Eligibility Criteria', key: 'eligibility_criteria', width: 30 },
        { header: 'Selection Rounds', key: 'selection_rounds', width: 25 },
        { header: 'Hiring Date', key: 'hiring_date', width: 15 },
        { header: 'Mode of Hiring', key: 'mode_hiring', width: 15 }
      ];
      
      // Add header row styling
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };
      
      // Add rows
      companies.forEach(company => {
        // Format date for better readability in Excel
        if (company.hiring_date) {
          const date = new Date(company.hiring_date);
          company.hiring_date = date.toISOString().split('T')[0];
        }
        
        worksheet.addRow(company);
      });
      
      // Set content type and disposition
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${type}_companies_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      // Write to response
      workbook.xlsx.write(res)
        .then(() => {
          res.end();
        })
        .catch(writeErr => {
          console.error('Error writing Excel:', writeErr);
          res.status(500).json({ error: 'Failed to generate Excel file' });
        });
    });
  } catch (err) {
    console.error('Error generating Excel file:', err);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
};

module.exports = {
  downloadCompanies
};