import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
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

  const handleBack = () => {
    navigate(-1);
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
      await axios.post(
        "https://free-ap-south-1.cosmocloud.io/development/api/emp",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            projectId: process.env.REACT_APP_PROJECT_ID,
            environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
          },
        }
      );
      setSuccessMessage("Employee added successfully!");
      setName("");
      setAddress({ line: "", city: "", country: "", zip_code: "" });
      setContactMethods([{ contact_method: "EMAIL", value: "" }]);
    } catch (error) {
      setErrorMessage("Error adding employee. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden no-scrollbar">
      <h1 className="text-3xl font-bold mb-6 text-white">Add Employee</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden"
      >
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg shadow">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address-line" className="block text-gray-300">
            Address Line
          </label>
          <input
            id="address-line"
            type="text"
            value={address.line}
            onChange={(e) => setAddress({ ...address, line: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-300">
            City
          </label>
          <input
            id="city"
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-300">
            Country
          </label>
          <input
            id="country"
            type="text"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip_code" className="block text-gray-300">
            ZIP Code
          </label>
          <input
            id="zip_code"
            type="text"
            value={address.zip_code}
            onChange={(e) =>
              setAddress({ ...address, zip_code: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Contact Methods</label>
          {contactMethods.map((cm, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <select
                value={cm.contact_method}
                onChange={(e) =>
                  handleContactMethodChange(
                    index,
                    "contact_method",
                    e.target.value
                  )
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveContactMethod(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddContactMethod}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Add Contact Method
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Add Employee
        </button>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition"
        onClick={handleBack}
      >
        Back
      </button>
    </div>
  );
};

export default AddEmployee;
