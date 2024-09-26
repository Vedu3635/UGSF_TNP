const bcrypt = require("bcryptjs");
const pool = require("../config/pool");

// Login function
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Query to find user in 'users' table
  const query = "SELECT * FROM users WHERE username = ?";

  pool.query(query, [username], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" }); // Ensure response for no user found
    }

    const user = results[0];

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Ensure response for wrong password
    }

    // Successful login'

    // res.json({ message: "Login successful" }); // Ensure response for successful login
    res.send(user); // Ensure response for successful login
  });
};
