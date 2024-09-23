const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Use CORS and allow requests from 'http://localhost:5173'
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/auth", authRoutes);  // All routes starting with /auth

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
