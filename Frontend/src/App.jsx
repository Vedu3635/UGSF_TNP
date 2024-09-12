import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LeftSlider from "./components/LeftSlider";
import RightSlider from "./components/RightSlider";
import NumberBox from "./components/NumberBox";
import CompanySlider from "./components/CompanySlider";
import Charts from "./components/Charts";
import StudentList from "./components/StudentList";
import Login from "./components/Login";

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <LeftSlider />
        <div className="flex-1 p-4 bg-[#bed5e7] overflow-auto">
          <div className="max-w-7xl mx-auto">
            <NumberBox />
            <CompanySlider />
            <Charts />
            <StudentList />
          </div>
        </div>
      </div>
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
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
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
