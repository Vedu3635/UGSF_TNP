import React, { useState } from "react";
import axios from "axios";

const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");

  // API base URL (replace with your actual backend URL)
  const API_BASE_URL = "https://api.yourdomain.com";

  // Navigate to login page
  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  // Handle email submit with API
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password/request`,
        { email }
      );
      setOtpToken(response.data.token); // Assuming the API returns a token for OTP verification
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) {
      // Adjusted for 6 digits (0-5)
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP submit with API
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the OTP"); // Updated for 6 digits
      return;
    }
    setError("");
    setLoading(true);
    const otpCode = otp.join("");
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password/verify-otp`, {
        email,
        otp: otpCode,
        token: otpToken,
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset with API
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password/confirm`, {
        email,
        token: otpToken,
        newPassword: password,
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } mr-2`}
          >
            1
          </div>
          <div
            className={`w-24 h-1 ${
              step >= 2 ? "bg-blue-500" : "bg-gray-200"
            } mr-2`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            } mr-2`}
          >
            2
          </div>
          <div
            className={`w-24 h-1 ${
              step >= 3 ? "bg-blue-500" : "bg-gray-200"
            } mr-2`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            3
          </div>
        </div>
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {/* Success message */}
        {success ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Password reset successful!
            </div>
            <p className="mb-4">Your password has been reset successfully.</p>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
              onClick={navigateToLogin}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:bg-blue-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={navigateToLogin}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
            {/* Step 2: OTP */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Enter OTP
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    We've sent a 6-digit code to {email}
                  </p>
                  <div className="flex justify-between mb-4">
                    {otp.map(
                      (
                        digit,
                        index // 6 inputs for 6-digit OTP
                      ) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500" // Adjusted width for 6 boxes
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          disabled={loading}
                        />
                      )
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:bg-blue-300 mb-4"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <div className="text-center flex justify-between">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Back to Email
                  </button>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={navigateToLogin}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
            {/* Step 3: Reset Password */}
            {step === 3 && (
              <form onSubmit={handlePasswordReset}>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:bg-blue-300 mb-4"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
                <div className="text-center flex justify-between">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    Back to OTP
                  </button>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={navigateToLogin}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
