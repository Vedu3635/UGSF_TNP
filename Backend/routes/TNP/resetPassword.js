const express = require("express");
const resetPasswordController = require("../../controllers/TNP/resetPassword");
const router = express.Router();

router.post("/request", resetPasswordController.requestPasswordReset);
router.post("/verify-otp", resetPasswordController.verifyOTP);

module.exports = router;
