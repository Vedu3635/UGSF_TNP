import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const [step, setStep] = useState(1); // 1: Request, 2: OTP, 3: Reset, 4: Approval Pending
  const [username, setUsername] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTnpAccount, setIsTnpAccount] = useState(false);
  const [approvalPending, setApprovalPending] = useState(false);
  const [timer, setTimer] = useState(600); // 10-minute timer for OTP
  const [accountEmail, setAccountEmail] = useState(""); // To show where OTP was sent
  const navigate = useNavigate();

  // API base URL
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5003/api";

  // Timer countdown
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle reset request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!username || !requesterEmail) {
      setError("Both username and your email are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requesterEmail)) {
      setError("Please enter a valid email address for notifications");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password/request`,
        {
          username,
          requester_email: requesterEmail,
        }
      );

      if (response.data.success) {
        if (response.data.message.includes("HOD")) {
          // TNP account - show approval pending
          setIsTnpAccount(true);
          setApprovalPending(true);
          setStep(4);
        } else {
          // Regular account - proceed to OTP
          setAccountEmail(response.data.accountEmail || "the account email");
          setStep(2);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to initiate reset process"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto-submit if last digit entered
    if (index === 5 && value !== "") {
      const otpCode = newOtp.join("");
      if (otpCode.length === 6) {
        handleOtpSubmit(null, otpCode);
      }
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e, otpCode = null) => {
    if (e) e.preventDefault();

    const codeToVerify = otpCode || otp.join("");
    if (codeToVerify.length !== 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password/verify-otp`,
        {
          username,
          otp: codeToVerify,
          requester_email: requesterEmail, // Include requester email for audit
        }
      );

      if (response.data.success) {
        setStep(3); // Proceed to password reset
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
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

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password/new-password`,
        {
          username,
          otp: otp.join(""),
          newPassword: password,
          requester_email: requesterEmail,
        }
      );

      if (response.data.success) {
        setSuccess(true);

        // Clear sensitive data
        setPassword("");
        setConfirmPassword("");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isTnpAccount ? "TNP Account Password Reset" : "Password Reset"}
          </h2>
          <p className="text-gray-600 mt-2">
            {step === 1 && "Enter the username and your email address"}
            {step === 2 && `Enter OTP sent to ${accountEmail}`}
            {step === 3 && "Set a new password"}
            {step === 4 && "Approval request sent to HOD"}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-24 h-1 ${
                    step > stepNumber ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              <h3 className="font-medium">Password reset successful!</h3>
              <p className="mt-1 text-sm">
                {isTnpAccount
                  ? "All affected faculty have been notified of this change."
                  : "You can now login with your new password."}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
              <p>Reset initiated by: {requesterEmail}</p>
              <p>Account affected: {username}</p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200 mt-4"
              onClick={() => navigate("/login")}
            >
              Return to Login
            </button>
          </div>
        ) : (
          <>
            {/* Step 1: Request reset */}
            {step === 1 && (
              <form onSubmit={handleRequestSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username to Reset
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., tnp_ce or faculty_john"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                      value={requesterEmail}
                      onChange={(e) => setRequesterEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be recorded as who requested the reset
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:bg-blue-300 mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Request Password Reset"
                  )}
                </button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={() => navigate("/login")}
                  >
                    Remember your password? Login instead
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Approval pending (TNP only) */}
            {step === 4 && (
              <div className="text-center">
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
                  <h3 className="font-medium">Approval Request Sent</h3>
                  <p className="mt-1 text-sm">
                    Your request to reset password for{" "}
                    <strong>{username}</strong> has been sent to the HOD for
                    approval.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded mb-4 text-sm text-left">
                  <p>
                    <strong>Requested by:</strong> {requesterEmail}
                  </p>
                  <p>
                    <strong>Account email:</strong> {accountEmail}
                  </p>
                  <p className="mt-2">
                    You will receive an OTP at the account email once approved.
                  </p>
                </div>
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => navigate("/login")}
                >
                  Return to Login
                </button>
              </div>
            )}

            {/* Step 2: OTP verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-medium">{accountEmail}</span>
                  </p>
                  <div className="flex justify-between space-x-2 mb-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        className="w-full h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        disabled={loading}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-red-500">
                      Expires in: {formatTime(timer)}
                    </span>
                    {timer <= 0 && (
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                        onClick={() => setStep(1)}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary action button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  disabled={loading || timer <= 0}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify Code"
                  )}
                </button>

                {/* Navigation buttons */}
                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                    onClick={() => setStep(1)}
                  >
                    Back to Request Form
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => navigate("/login")}
                    >
                      Remember your password? Login instead
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 3: Password reset */}
            {step === 3 && (
              <form onSubmit={handlePasswordReset}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {isTnpAccount && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded my-4 text-sm">
                    <p>
                      <strong>Note for TNP Accounts:</strong>
                    </p>
                    <p className="mt-1">
                      All faculty members in this department will be notified of
                      this password change.
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded my-4 text-sm">
                  <p>
                    <strong>Reset Details:</strong>
                  </p>
                  <p className="mt-1">Account: {username}</p>
                  <p>Requested by: {requesterEmail}</p>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? "Updating Password..." : "Reset Password"}
                  </button>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-3"
                    onClick={() => navigate("/login")}
                  >
                    Remember your password? Login instead
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
