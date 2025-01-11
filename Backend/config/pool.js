const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config(); // Load environment variables from .env file

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // Maximum number of connections in the pool
});

// Log successful connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database through the pool.");
  connection.release(); // Release the connection back to the pool
});

// Promisify the pool's query method
pool.query = util.promisify(pool.query);

module.exports = pool;
