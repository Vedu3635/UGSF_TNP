const express = require("express");
const router = express.Router();
const fileUpload = require("../../controllers/TNP/fileUpload");
const authMiddleware = require("../../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter to accept only Excel files
const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".xlsx" && ext !== ".xls") {
    return callback(new Error("Only Excel files are allowed!"), false);
  }
  callback(null, true);
};

// Multer setup with file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Update the route to handle Excel files
router.post(
  "/import-excel",
  upload.single("file"),
  authMiddleware,
  fileUpload.uploadFile
);

module.exports = router;
