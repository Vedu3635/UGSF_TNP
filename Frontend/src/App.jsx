import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import CompanySlider from "./components/CompanySlider";
import NumberBox from "./components/NumberBox";
import Charts from "./components/Charts";
import StudentList from "./components/StudentList";
import LeftSlider from "./components/LeftSlider";
import RightSlider from "./components/RightSlider";
import Login from "./components/Login";

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Left Sidebar */}
      <LeftSlider />
      {/* Navbar */}
      <Header />
      <div className="flex-1 container mx-auto p-4 bg-[#bed5e7]">
        {/* NumberBox */}
        <NumberBox />
        {/* company slider */}
        <CompanySlider />
        {/* Charts */}
        <Charts />
        {/* Additional Containers */}
        <StudentList />
      </div>
      {/* Right Sidebar */}
      <RightSlider />
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
