import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://free-ap-south-1.cosmocloud.io/development/api/emp?limit=10&offset=0",
          {
            headers: {
              projectId: process.env.REACT_APP_PROJECT_ID,
              environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
            },
          }
        );
        if (Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          console.error("Data fetched is not an array:", response.data);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setErrorMessage("Failed to load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id1) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/emp/${id1}`,
        {
          method: "DELETE",
          headers: {
            projectId: process.env.REACT_APP_PROJECT_ID,
            environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error response:", responseText);
        throw new Error("Network response was not ok");
      }

      console.log("Employee deleted successfully");
      setEmployees(employees.filter((employee) => employee._id !== id1));
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete employee. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-700 transition"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold">EMPLOYEE LIST</h1>
      </div>
      {employees.length > 0 && (
        <div className="mb-6">
          <p className="text-lg">Total Employees: {employees.length}</p>
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-600 text-red-100 rounded-lg shadow">
          {errorMessage}
        </div>
      )}
      {employees.length === 0 ? (
        <p className="text-gray-400">No Employees in the system</p>
      ) : (
        <ul className="space-y-4">
          {employees.map((employee) => (
            <li
              key={employee._id}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4 bg-transparent">
                <h2 className="text-xl font-semibold text-gray-100">
                  {employee.name}
                </h2>
                <span className="text-sm text-gray-400">
                  ID: {employee._id}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/employee-details/${employee._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <Link
                  to={`/employee-update/${employee._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Update
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
