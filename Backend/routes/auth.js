const express = require("express");
const { login, getProtectedData } = require("../controllers/authController");
const router = express.Router();

// Login Route
router.post("/login", login);

// Protected Route Example
router.get("/protected", getProtectedData);

module.exports = router;
