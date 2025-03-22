import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./pages/AuthContext"; // Adjust path
import Login from "./pages/TNP/Login";
import Dashboard from "./pages/TNP/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import AlumniDashboard from "./pages/AlumniPortal/AlumniDashboard";
import PublicRoute from "./pages/PublicRoute";
import RootPage from "./pages/RootPage"; // Adjust path to where RootPage.jsx is located
import NotFound from "./pages/NotFound";
import PasswordReset from "./components/TNP/PasswordReset";
// import StudentList from "./components/TNP/student/StudentList";
const router = createBrowserRouter([
  {
    element: <RootPage />, // Use RootPage as the layout
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <PublicRoute>
            <PasswordReset />
          </PublicRoute>
        ),
      },
      // {
      //   path: "/view-students",
      //   element: (
      //     <ProtectedRoute>
      //       <StudentList />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/alumni",
        element: (
          <ProtectedRoute>
            <AlumniDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // Catch-all route
        element: <NotFound />, // Render NotFound within RootPage layout
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
