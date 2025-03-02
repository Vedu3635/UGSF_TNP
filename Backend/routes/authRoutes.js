const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Login route (unprotected)
router.post("/login", authController.login);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  // This route is protected and only accessible with a valid token
  res.json({
    message: "Access granted",
    user: req.user, // req.user is available because of the middleware
  });
});

module.exports = router;
