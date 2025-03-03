const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/pool");
const dotenv = require("dotenv");

dotenv.config();

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body; // This is the password from the request body

  // Query to find user in 'users' table
  const query = "SELECT * FROM users WHERE username = ?";

  pool.query(query, [username], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0]; // This is the user data from the database

    // Compare password from req.body with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If password matches, generate a JWT token
    const payload = {
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
    };

    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Exclude the password from the user object before sending it
      const { password: hashedPassword, ...safeUser } = user; // Rename destructured password to avoid conflict

      // Send the response with the token and user details (without the password)
      res.json({
        message: "Login successful",
        token: token, // Send the token to the client
        user: safeUser, // Send the user data without password
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error generating token" });
    }
  });
};
