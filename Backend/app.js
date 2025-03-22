const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileUploadRoutes = require("./routes/TNP/fileUploadRoutes");
const studentRoutes = require("./routes/TNP/studentRoutes");
const fileDownloadRoutes = require("./routes/TNP/fileDownloadRoutes");
const editStudentRoutes = require("./routes/TNP/editStudent");
const companyRoutes = require("./routes/TNP/companyRoutes");
const editCompanyRoutes = require("./routes/TNP/editCompanyRoutes");
const deleteCompnayRoutes = require("./routes/TNP/deleteCompany");
const deleteStudentRoutes = require("./routes/TNP/deleteStudent");
const companyListDownloadRoutes = require('./routes/TNP/companyListDownload');
const resetPasswordRoutes = require('./routes/TNP/resetPassword');
const dotenv = require("dotenv");

dotenv.config();

const app = express();          

// Middleware
app.use(express.json());

// Use CORS and allow requests from 'http://localhost:5173'
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "http://localhost:4173",
    ],
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/api/file", fileUploadRoutes); //file Upload
app.use("/api/students", studentRoutes);
app.use("/api", fileDownloadRoutes);
app.use("/api/edit-student", editStudentRoutes);
app.use("/api", companyRoutes);
app.use("/api/edit-company", editCompanyRoutes);
app.use("/api", deleteCompnayRoutes);
app.use("/api", deleteStudentRoutes);
app.use('/api/download', companyListDownloadRoutes);
app.use('/api/auth', resetPasswordRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
