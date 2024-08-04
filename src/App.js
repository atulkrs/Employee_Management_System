import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeUpdate from "./components/EmployeeUpdate";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/employee-details/:id" element={<EmployeeDetails />} />
          <Route path="/employee-update/:id" element={<EmployeeUpdate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
