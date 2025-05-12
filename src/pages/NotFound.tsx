import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center p-8 max-w-md mx-auto animate-fade-in-up">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-red-100 rounded-full opacity-75 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-lg">
            <FaExclamationTriangle className="text-red-500 text-6xl animate-bounce" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for at{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">
            {location.pathname}
          </code>{" "}
          doesn't exist.
        </p>

        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <FaHome className="mr-2" />
          Return to Home
        </a>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Or wait while we redirect you shortly...</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
