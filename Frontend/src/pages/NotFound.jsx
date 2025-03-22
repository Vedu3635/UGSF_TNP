import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6 flex flex-col items-center">
            <AlertTriangle className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-6xl font-bold text-blue-700">404</h1>
            <div className="mt-2">
              <div className="h-1 w-16 bg-blue-600 rounded"></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <Link to="/events" className="text-blue-600 hover:underline">
                Check our events
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
