import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary
import {
  FaGoogle,  
  FaFacebookF,
  FaApple,
  FaEnvelope,
  FaLock,
  FaQuoteLeft,
} from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

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
        throw new Error(result.message || "Login failed"); // Handle non-200 responses
      }

      if (result.token) {
        // Pass the token to the login function from context
        login(result.token); // Notify context of successful login
        navigate("/"); // Navigate to dashboard on success
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error.message); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32">
        <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-8">
          Welcome to AOT
        </h2>
        <p className="text-gray-500 mb-6 text-center md:text-left">
          Blandit libero volutpat sed cras ornare arcu dui. Accumsan in nisl
          nisi scelerisque eu.
        </p>
        <form
          className="bg-white shadow-md rounded-lg p-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4 relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Username
            </label>
            <input
              type="text" // Changed to "text" for proper input type
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="example@mail.com"
              required // Added required validation
            />
            <div className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" size="20" />
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="6+ strong characters"
              required // Added required validation
            />
            <div className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" size="20" />
            </div>
          </div>
          {/* Display error message if present */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`} // Disable button during loading
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-500">
            Or sign up with
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="bg-white p-2 rounded-full border border-gray-300 hover:shadow-lg">
              <FaGoogle className="text-blue-500" size="24" />
            </button>
            <button className="bg-white p-2 rounded-full border border-gray-300 hover:shadow-lg">
              <FaFacebookF className="text-blue-600" size="24" />
            </button>
            <button className="bg-white p-2 rounded-full border border-gray-300 hover:shadow-lg">
              <FaApple className="text-black" size="24" />
            </button>
          </div>
        </form>
      </div>

      {/* Right side */}
      <div className="hidden md:flex md:w-1/2 bg-[#0066b3] text-white items-center justify-center">
        <div className="text-center px-8 py-12 md:px-16 lg:px-24">
          <FaQuoteLeft size="36" className="mx-auto mb-4 text-white" />
          <h1 className="text-5xl font-bold mb-4">Make a Dream.</h1>
          <p className="text-lg mb-8">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
