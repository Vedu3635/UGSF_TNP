const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const studentRoutes = require("./routes/studentRoutes");
const excelRoutes = require("./routes/excelRoutes");
const editStudentRoutes = require("./routes/editStudent");
const companyRoutes = require("./routes/companyRoutes");
const editCompanyRoutes = require("./routes/editCompanyRoutes");
const deleteCompnayRoutes = require("./routes/deleteCompany");
const deleteStudentRoutes = require("./routes/deleteStudent");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Use CORS and allow requests from 'http://localhost:5173'
app.use(
  cors({
    origin: ["http://localhost:5174/","http://localhost:5173"],
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/students", studentRoutes);
app.use("/api", excelRoutes);
app.use("/api/edit-student", editStudentRoutes);
app.use("/api", companyRoutes);
app.use("/api/edit-company", editCompanyRoutes);
app.use("/api", deleteCompnayRoutes);
app.use("/api", deleteStudentRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
