const pool = require('../../config/pool');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Store OTPs temporarily (in production, use Redis or another solution)
const otpStore = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ success: false, message: 'Username and email are required' });
    }

    // Check if user exists with this username
    const users = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      // Don't reveal that the username doesn't exist for security reasons
      return res.status(200).json({ 
        success: true, 
        message: 'If your username is registered, you will receive an OTP shortly' 
      });
    }

    // Generate and store OTP
    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    
    otpStore.set(username, {
      otp,
      expiryTime,
      email // Store email temporarily to send the OTP
    });

    // Send email with OTP
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - College Placement Portal',
      html: `
        <h1>Password Reset Request</h1>
        <p>You have requested to reset your password for the College Placement Portal.</p>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (error) {
    console.error('Request password reset error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
};


// Verify OTP and reset password in one step
exports.verifyOTP = async (req, res) => {
    try {
      const { username, otp, newPassword } = req.body;
  
      if (!username || !otp || !newPassword) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username, OTP, and new password are required' 
        });
      }
  
      const storedOTPData = otpStore.get(username);
  
      if (!storedOTPData) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid or expired OTP' 
        });
      }
  
      const { otp: storedOTP, expiryTime } = storedOTPData;
  
      // Check if OTP is expired
      if (Date.now() > expiryTime) {
        otpStore.delete(username);
        return res.status(400).json({ 
          success: false, 
          message: 'OTP has expired' 
        });
      }
  
      // Check if OTP matches
      if (otp !== storedOTP) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid OTP' 
        });
      }
  
      // Password validation
      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long'
        });
      }
  
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update password in database
      await pool.query(
        'UPDATE users SET password = ? WHERE username = ?',
        [hashedPassword, username]
      );
  
      // Clear the OTP
      otpStore.delete(username);
  
      return res.status(200).json({
        success: true,
        message: 'Password has been reset successfully'
      });
    } catch (error) {
      console.error('Verify OTP and reset password error:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  };



