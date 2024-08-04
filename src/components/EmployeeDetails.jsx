import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetails = React.memo(() => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const fetchEmployeeDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/emp/${id}`,
        {
          headers: {
            projectId: "66aa93c1f0b1983e001ffecf",
            environmentId: "66aa93c1f0b1983e001ffed0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      setErrorMessage("Failed to load employee details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [fetchEmployeeDetails]);

  const handleBack = () => {
    navigate("/employee-list"); // Navigate to the employee list page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-gray-400">Loading...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-black p-6 text-red-500">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Employee Details</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-800 transition"
          >
            Back
          </button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            {employee.name}
          </h2>
          <p className="text-gray-300 mb-2">
            <strong>Address:</strong> {employee.address.line},{" "}
            {employee.address.city}, {employee.address.country},{" "}
            {employee.address.zip_code}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Contact Methods:</strong>
          </p>
          <ul className="list-disc list-inside">
            {employee.contact_methods.map((contact, index) => (
              <li key={index} className="text-gray-300">
                {contact.contact_method === "EMAIL" ? (
                  <>
                    <span className="text-white">Email:</span>
                    <a
                      href={`mailto:${contact.value}`}
                      className="text-blue-400 hover:underline ml-1"
                    >
                      {contact.value}
                    </a>
                  </>
                ) : contact.contact_method === "PHONE" ? (
                  <>
                    <span className="text-white">Phone:</span>
                    <a
                      href={`tel:${contact.value}`}
                      className="text-blue-400 hover:underline ml-1"
                    >
                      {contact.value}
                    </a>
                  </>
                ) : (
                  `${contact.contact_method}: ${contact.value}`
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default EmployeeDetails;
