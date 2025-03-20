import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the path as necessary
import { FaLock, FaUser } from "react-icons/fa";

// Import the images properly
import charusatLogo from "/images/CHARUSAT_logo.png"; // Use absolute path from root
import depstarLogo from "/images/depstar_logo.png"; // Use absolute path from root
import depstarEntrance from "/images/depstar_entrance.jpeg";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (result.token) {
        login(result.token);
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 py-10 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-blue-600"></div>
          <div className="absolute top-1/3 right-5 w-32 h-32 rounded-full bg-blue-300"></div>
        </div>

        {/* Content wrapper with proper z-index */}
        <div className="w-full max-w-md relative z-10">
          {/* CHARUSAT Logo with improved styling */}
          <div className="mb-10 flex justify-center">
            <div className="bg-white p-5 rounded-xl shadow-lg flex items-center justify-center w-full h-28 border border-gray-100">
              <img
                src={charusatLogo}
                alt="CHARUSAT Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">
              Sign in to continue to CareerVista
            </p>
          </div>

          {/* Login form with improved styling */}
          <form
            className="bg-white shadow-lg rounded-xl p-8 mb-8 w-full border border-gray-100"
            onSubmit={handleLogin}
          >
            <div className="mb-6 relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-blue-500" size="16" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="username"
                  required
                />
              </div>
            </div>

            <div className="mb-6 relative">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-blue-500" size="16" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="6+ strong characters"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Logging In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Enhanced version */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        {/* School Entrance Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={depstarEntrance}
            alt="DEPSTAR Institute Entrance"
            className="w-full h-full object-cover"
          />
          {/* Improved overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/60 to-blue-900/80"></div>
        </div>

        {/* Enhanced wave pattern with better positioning */}
        <div className="absolute inset-0 opacity-20 z-10">
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-363.33,297.42 C-292.29,210.58 -113.48,258.76 -43.05,193.79 C27.37,128.82 -22.14,16.52 104.15,1.62 C230.44,-13.28 281.31,124.15 357.63,147.54 C433.95,170.93 477.71,110.35 570.43,155.48 C663.16,200.62 759.7,349.13 710.26,455.99 C660.82,562.86 535.54,510.83 467.55,585.21 C399.55,659.59 457.25,825.91 357.63,799.49 C258.01,773.08 295.04,676.22 218.68,614.23 C142.32,552.24 14.42,596.37 -56.05,511.12 C-126.52,425.87 -95.01,338.28 -160.67,285.12 C-226.33,231.96 -434.37,384.25 -363.33,297.42"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center h-full px-8 py-12 relative z-20">
          {/* Improved logo container with better shadow and glow */}
          <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-2xl mb-10 relative">
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-md"></div>
            <div className="absolute -inset-1 rounded-full bg-blue-100 opacity-10 blur-lg animate-pulse"></div>
            <img
              src={depstarLogo}
              alt="DEPSTAR Logo"
              className="w-36 h-36 rounded-full object-contain"
            />
          </div>

          {/* Enhanced text with animation and better typography */}
          <h1 className="text-5xl font-bold mb-8 text-white text-center leading-tight tracking-tight drop-shadow-lg">
            <span className="block transform transition-transform hover:scale-105 duration-300">
              Empowering
            </span>
            <span className="block transform transition-transform hover:scale-105 duration-300 delay-75">
              Academic
            </span>
            <span className="block transform transition-transform hover:scale-105 duration-300 delay-150">
              Excellence.
            </span>
          </h1>

          {/* Improved description container with better blur effect */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-md backdrop-blur-md shadow-lg border border-white/10">
            <p className="text-lg text-white leading-relaxed text-center drop-shadow">
              "CareerVista helps you stay connected with student outcomes, track
              placement trends, and prepare for upcoming graduations."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
