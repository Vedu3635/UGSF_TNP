import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./pages/TNP/Login";
import Dashboard from "./pages/TNP/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import StudentList from "./components/TNP/StudentList";
import AlumniManagement from "./components/AlumniPortal/AlumniManagement";
import Navbar from "./components/Navbar";
import AlumniDashboard from "./pages/AlumniPortal/AlumniDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/view-students",
    element: (
      <PrivateRoute>
        <StudentList />
      </PrivateRoute>
    ),
  },
  {
    path: "/alumni",
    element: (
      <PrivateRoute>
        <AlumniDashboard />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Navbar />
    </RouterProvider>
  );
}

export default App;
