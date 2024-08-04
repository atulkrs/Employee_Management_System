import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 overflow-hidden">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6">Employee Management System</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </button>
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
            onClick={() => navigate("/employee-list")}
          >
            Employee List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
