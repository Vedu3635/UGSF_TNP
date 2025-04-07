// controllers/TNP/excelController.js
const ExcelJS = require("exceljs");
// Fix the import path to match your project structure
const ExcelModel = require("../../models/excelModel");

const downloadExcel = async (req, res) => {
  try {
    // Get the table name and year from the query parameter
    const tableName = req.query.table;
    const year = req.query.year;
    // console.log(tableName);
    if (!tableName) {
      return res
        .status(400)
        .json({ success: false, message: "Table name is required" });
    }

    // Fetch data based on whether a year filter is provided
    let results;
    if (year) {
      results = await ExcelModel.getDataFromTableByYear(tableName, year);
    } else {
      results = await ExcelModel.getDataFromTable(tableName);
    }

    // Check if there are any results
    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No data found for ${tableName}${
          year ? ` in year ${year}` : ""
        }`,
      });
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add column headers
    worksheet.columns = Object.keys(results[0]).map((key) => ({
      header: key,
      key,
      width: 15, // Set a reasonable column width
    }));

    // Add data rows
    results.forEach((row) => {
      worksheet.addRow(row);
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true };

    // Set response headers for downloading the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Create a filename that includes the year if it was filtered
    const filename = year ? `${tableName}_${year}.xlsx` : `${tableName}.xlsx`;

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    // Stream the Excel file to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({
      success: false,
      message: "Error generating Excel file",
      error: error.message,
    });
  }
};

module.exports = {
  downloadExcel,
};
