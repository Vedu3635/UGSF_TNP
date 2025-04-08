const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../config/pool");

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header("authorization");
  // console.log("Authorization header:", token);

  if (!token) {
    // console.log("No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const tokenParts = token.split(" ");
    // console.log("Token parts:", tokenParts);
    const jwtToken = tokenParts[1];
    // console.log("Extracted JWT token:", jwtToken);

    if (!jwtToken) {
      throw new Error("Bearer token missing");
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log("Decoded payload:", decoded);
    // console.log("req.user set to:", decoded.user);
    req.user = decoded.user;

    const query = "SELECT * FROM users WHERE user_id = ?";
    // console.log("Querying user with ID:", req.user.id);
    pool.query(query, [req.user.id], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      }

      // console.log("Query results:", results);
      if (results.length === 0) {
        // console.log("User not found in database");
        return res
          .status(401)
          .json({ message: "Invalid token: User no longer exists" });
      }

      // console.log("User found, proceeding");
      next();
    });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res
      .status(401)
      .json({ message: "Token is not valid", error: err.message });
  }
};
