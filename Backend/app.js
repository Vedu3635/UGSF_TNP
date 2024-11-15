const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dotenv = require("dotenv");
const excelRoutes = require("./routes/excelRoutes");

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
app.use("/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/students", studentRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", excelRoutes);