const pool = require("../../config/pool");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Store OTPs temporarily (use Redis in production)
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

// Generate random password
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex"); // Generates a 16-character random password
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

    // Restrict to university email only
    if (!requester_email.endsWith("@charusat.edu.in")) {
      return res.status(400).json({
        success: false,
        message: "Only university emails are allowed for password reset",
      });
    }

    // Check if username exists and email matches
    const users = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message:
          "If your username is registered, an OTP will be sent to your email",
      });
    }

    const user = users[0];
    // const accountEmail = user.email; // Commented out initially

    // Ensure requester email matches account email
    // if (accountEmail !== requester_email) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Requester email must match the account email",
    //   });
    // }

    // Generate OTP
    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10-minute expiry

    otpStore.set(username, {
      otp,
      expiryTime,
      requester_email,
      // accountEmail, // Commented out since accountEmail is not defined
    });

    // Send OTP to requester_email instead of accountEmail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: requester_email, // Changed to requester_email
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
      message: "OTP sent to your university email",
    });
  } catch (error) {
    console.error("Request password reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

// Verify OTP and send new password to principal
exports.verifyOTPAndReset = async (req, res) => {
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

    // Generate a new random password
    const newPassword = generateRandomPassword();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    await pool.query("UPDATE users SET password = ? WHERE username = ?", [
      hashedPassword,
      username,
    ]);

    // Send new password to principal's email
    const principalEmail = process.env.PRINCIPAL_EMAIL; // Stored in .env
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: principalEmail,
      subject: `Password Reset for ${username} - CareerVista`,
      html: `
        <h1>Password Reset Notification</h1>
        <p>A password reset was completed for user: <strong>${username}</strong></p>
        <p>Requested by: <strong>${storedData.requester_email}</strong></p>
        <p>New password: <strong>${newPassword}</strong></p>
        <p>Date: ${new Date().toISOString()}</p>
        <p>Please provide this password to the faculty securely.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Clear OTP after successful reset
    otpStore.delete(username);

    return res.status(200).json({
      success: true,
      message: "OTP verified, new password sent to the principal's email",
    });
  } catch (error) {
    console.error("Verify OTP and reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};
