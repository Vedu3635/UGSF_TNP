const fs = require('fs');
const csv = require('fast-csv');
const pool = require('../config/pool'); // Update this path if pool.js is in a different location

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    uploadCsv(filePath, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error processing file.' });
        }
        res.json({ message: "Data stored successfully" });
    });
};

function uploadCsv(path, callback) {
    let stream = fs.createReadStream(path);
    let csvDataColl = [];
    let fileStream = csv
        .parse()
        .on("data", function(data) {
            csvDataColl.push(data);
        })
        .on("end", function() {
            csvDataColl.shift(); // Remove header row
            
            pool.getConnection((error, connection) => {
                if(error) {
                    console.log(error);
                    return callback(error);
                }
                let query = "INSERT INTO data (name, age, country) VALUES ?";
                connection.query(query, [csvDataColl], (error, result) => {
                    connection.release();
                    if (error) {
                        return callback(error);
                    }
                    fs.unlinkSync(path);
                    callback(null);
                });
            });
        });
    stream.pipe(fileStream);
}