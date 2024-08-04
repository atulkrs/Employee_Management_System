import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    line: "",
    city: "",
    country: "",
    zip_code: "",
  });
  const [contactMethods, setContactMethods] = useState([
    { contact_method: "EMAIL", value: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `https://free-ap-south-1.cosmocloud.io/development/api/emp/${id}`,
          {
            headers: {
              projectId: process.env.REACT_APP_PROJECT_ID,
              environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
            },
          }
        );
        const data = response.data;
        if (response.status === 200) {
          setName(data.name);
          setAddress(
            data.address || {
              line: "",
              city: "",
              country: "",
              zip_code: "",
            }
          );
          setContactMethods(
            data.contact_methods || [{ contact_method: "EMAIL", value: "" }]
          );
        } else {
          console.error("Failed to fetch employee details:", data);
          setErrorMessage("Failed to fetch employee details.");
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setErrorMessage("Error fetching employee details.");
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/employee-list");
  };

  const handleAddContactMethod = () => {
    setContactMethods([
      ...contactMethods,
      { contact_method: "EMAIL", value: "" },
    ]);
  };

  const handleContactMethodChange = (index, field, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][field] = value;
    setContactMethods(newContactMethods);
  };

  const handleRemoveContactMethod = (index) => {
    const newContactMethods = contactMethods.filter((_, i) => i !== index);
    setContactMethods(newContactMethods);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validContactMethods = contactMethods.filter(
      (cm) => cm.contact_method && cm.value
    );

    const payload = {
      name,
      address,
      contact_methods: validContactMethods,
    };

    try {
      const response = await axios.put(
        `https://free-ap-south-1.cosmocloud.io/development/api/emp/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            projectId: process.env.REACT_APP_PROJECT_ID,
            environmentId: process.env.REACT_APP_ENVIRONEMENT_ID,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Employee updated successfully!");
        setTimeout(() => {
          navigate("/employee-list");
        }, 2000);
      } else {
        console.error("Failed to update employee:", response.data);
        setErrorMessage("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("Error updating employee.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 overflow-hidden">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-8 text-gray-100 text-center">
          Update Employee Details
        </h1>
        <form onSubmit={handleSubmit}>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-600 text-white rounded-lg shadow-md">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-lg shadow-md">
              {errorMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 font-medium mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address-line"
                className="block text-gray-300 font-medium mb-2"
              >
                Address Line
              </label>
              <input
                id="address-line"
                type="text"
                value={address.line}
                onChange={(e) =>
                  setAddress({ ...address, line: e.target.value })
                }
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-gray-300 font-medium mb-2"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-gray-300 font-medium mb-2"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="zip_code"
                className="block text-gray-300 font-medium mb-2"
              >
                ZIP Code
              </label>
              <input
                id="zip_code"
                type="text"
                value={address.zip_code}
                onChange={(e) =>
                  setAddress({ ...address, zip_code: e.target.value })
                }
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Contact Methods
            </label>
            {contactMethods.map((cm, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <select
                  value={cm.contact_method}
                  onChange={(e) =>
                    handleContactMethodChange(
                      index,
                      "contact_method",
                      e.target.value
                    )
                  }
                  className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                </select>
                <input
                  type="text"
                  value={cm.value}
                  onChange={(e) =>
                    handleContactMethodChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
                  className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveContactMethod(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContactMethod}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Add Contact Method
            </button>
          </div>
          <button
            type="submit"
            className="w-2/4 mx-auto block px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition"
          >
            Update
          </button>
        </form>
        <button
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition mx-auto block"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeUpdate;
