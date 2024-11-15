// models/excelModel.js
const pool = require('../config/pool');

class ExcelModel {
    static getDataFromTable(tableName) {
        // Whitelist of allowed tables for security
        const allowedTables = ['higher_studies_details', 'placement_details', 'students'];
        if (!allowedTables.includes(tableName)) {
            throw new Error('Invalid table name');
        }

        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${tableName}`;
            
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
