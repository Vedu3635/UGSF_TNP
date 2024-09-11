const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    // expiresIn: "1h",
  });
};

// Login Controller (without hashed passwords)
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // Compare the entered password with the plain text password from the database
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  });
};

// Protected Data Controller
exports.getProtectedData = (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "You have accessed protected data", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
