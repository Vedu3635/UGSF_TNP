import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import StudentList from "./components/StudentList";
import AlumniManagement from "./components/AlumniManagement"; 
import Navbar from "./components/Navbar"; 

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
        <AlumniManagement />
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
