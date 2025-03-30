const pool = require("../../config/pool");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Store OTPs and reset requests temporarily (use Redis in production)
const otpStore = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., careervista.admin@gmail.com
    pass: process.env.EMAIL_PASSWORD, // App-specific password
  },
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { username, requester_email } = req.body;

    if (!username || !requester_email) {
      return res.status(400).json({
        success: false,
        message: "Username and requester email are required",
      });
    }

    // Check if username exists
    const users = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message:
          "If your username is registered, a reset process will begin shortly",
      });
    }

    const user = users[0];
    const accountEmail = user.email; // e.g., tnp.ce@university.edu
    const isTnp = user.role === "tnpfaculty"; // Check if it's a TNP account

    // Generate approval token for TNP (HOD verification)
    // if (isTnp) {
    //   const approvalToken = crypto.randomBytes(16).toString("hex");
    //   const expiryTime = Date.now() + 15 * 60 * 1000; // 15-minute expiry

    //   otpStore.set(username, {
    //     approvalToken,
    //     expiryTime,
    //     requester_email,
    //     accountEmail,
    //   });

    //   // Send approval email to HOD
    //   const hodEmail = "hod@university.edu"; // Replace with env variable in production
    //   const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: hodEmail,
    //     subject: `Approve Password Reset for ${username}`,
    //     html: `
    //       <h1>Password Reset Approval</h1>
    //       <p>Reset requested for ${username} by ${requester_email}.</p>
    //       <p><a href="https://careervista.university.edu/approve?token=${approvalToken}">Click here to approve</a></p>
    //       <p>This link expires in 15 minutes.</p>
    //     `,
    //   };

    //   await transporter.sendMail(mailOptions);
    //   return res.status(200).json({
    //     success: true,
    //     message: "Approval request sent to HOD",
    //   });
    // }

    // For non-TNP (general faculty), send OTP directly
    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10-minute expiry

    otpStore.set(username, {
      otp,
      expiryTime,
      requester_email,
      accountEmail,
    });

    // Send OTP to account email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: accountEmail,
      subject: "Password Reset OTP - CareerVista",
      html: `
        <h1>Password Reset Request</h1>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP expires in 10 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "OTP sent to the account email",
    });
  } catch (error) {
    console.error("Request password reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

// Approve reset (for TNP only)
exports.approveReset = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Approval token is required",
      });
    }

    // Find the request by approval token
    let username = null;
    for (const [key, value] of otpStore) {
      if (value.approvalToken === token) {
        username = key;
        break;
      }
    }

    const storedData = otpStore.get(username);
    if (!storedData || Date.now() > storedData.expiryTime) {
      otpStore.delete(username);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired approval token",
      });
    }

    // Generate OTP after HOD approval
    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000;

    otpStore.set(username, {
      otp,
      expiryTime,
      requester_email: storedData.requester_email,
      accountEmail: storedData.accountEmail,
    });

    // Send OTP to account email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: storedData.accountEmail,
      subject: "Password Reset OTP - CareerMarg",
      html: `
        <h1>Password Reset Approved</h1>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP expires in 10 minutes.</p>
        <p>If you did not request this, contact support.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Reset approved, OTP sent to account email",
    });
  } catch (error) {
    console.error("Approve reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { username, otp } = req.body;

    if (!username || !otp) {
      return res.status(400).json({
        success: false,
        message: "Username and OTP are required",
      });
    }

    const storedData = otpStore.get(username);
    if (!storedData || !storedData.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP not requested or expired",
      });
    }

    if (Date.now() > storedData.expiryTime) {
      otpStore.delete(username);
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (otp !== storedData.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      username,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { username, otp, newPassword, requester_email } = req.body;

    if (!username || !otp || !newPassword || !requester_email) {
      return res.status(400).json({
        success: false,
        message:
          "Username, OTP, new password, and requester email are required",
      });
    }

    const storedData = otpStore.get(username);
    if (
      !storedData ||
      storedData.otp !== otp ||
      Date.now() > storedData.expiryTime
    ) {
      otpStore.delete(username);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Password validation
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    await pool.query("UPDATE users SET password = ? WHERE username = ?", [
      hashedPassword,
      username,
    ]);

    // Notify affected users
    const isTnp = storedData.accountEmail.includes("tnp");
    const dept = username.split("_")[1]; // e.g., "ce" from "tnp_ce"
    let notifyEmails = [];

    if (isTnp) {
      // Notify both TNP faculty for the department
      const tnpUsers = await pool.query(
        "SELECT personal_email FROM faculty_mapping WHERE username = ?",
        [username]
      );
      notifyEmails = tnpUsers.map((u) => u.personal_email); // e.g., [faculty1.ce@university.edu, faculty2.ce@university.edu]
    } else {
      // Notify all faculty for general account
      notifyEmails = ["22dce059@charusat.edu.in"]; // Use a mailing list
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: notifyEmails,
      subject: `${username} Password Changed - CareerVista`,
      html: `
        <h1>Password Reset Notification</h1>
        <p>The password for ${username} was reset by ${requester_email} on ${new Date().toISOString()}.</p>
        <p>New password: <strong>${newPassword}</strong></p>
        <p>Please store this securely.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Clear OTP after successful reset
    otpStore.delete(username);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully, affected users notified",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};
