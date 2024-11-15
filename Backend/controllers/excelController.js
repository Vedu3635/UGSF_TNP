// controller/excelController.js
const ExcelJS = require('exceljs');
const ExcelModel = require('../models/excelModel');

exports.downloadExcel = async (req, res) => {
    try {
        // Get the table name from the query parameter
        const tableName = req.query.table;
        if (!tableName) {
            return res.status(400).json({ success: false, message: 'Table name is required' });
        }

        // Fetch data from the specified table
        const results = await ExcelModel.getDataFromTable(tableName);
        
        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        // Add column headers
        worksheet.columns = Object.keys(results[0]).map(key => ({
            header: key,
            key,
            width: 15 // Set a reasonable column width
        }));

        // Add data rows
        results.forEach(row => {
            worksheet.addRow(row);
        });

        // Style the header row
        worksheet.getRow(1).font = { bold: true };

        // Set response headers for downloading the file
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${tableName}.xlsx`
        );

        // Stream the Excel file to the response
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating Excel file'
        });
    }
};
