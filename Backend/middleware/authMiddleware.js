const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../config/pool"); // Import the database connection

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract the token without "Bearer" prefix

    req.user = decoded.user; // Attach decoded user info from the token to req.user

    // Check if the user still exists in the database
    const query = "SELECT * FROM users WHERE id = ?";

    pool.query(query, [req.user.id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid token: User no longer exists" });
      }

      // User is valid, proceed to the next middleware/route handler
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
