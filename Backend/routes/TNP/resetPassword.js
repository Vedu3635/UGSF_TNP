const express = require("express");
const resetPasswordController = require("../../controllers/TNP/resetPassword");
const router = express.Router();

// `${API_BASE_URL}/auth/reset-password/request`;

router.post("/request", resetPasswordController.requestPasswordReset);
router.post("/verify-otp", resetPasswordController.verifyOTPAndReset);
// router.post("/new-password", resetPasswordController.resetPassword);
// router.get("/approve-reset", resetPasswordController.approveReset);

module.exports = router;
