import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./pages/AuthContext"; // Adjust path
import Login from "./pages/TNP/Login"; // Eagerly load Login since it’s the entry point
import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./pages/ProtectedRoute";
import RootPage from "./pages/RootPage"; // Adjust path
import NotFound from "./pages/NotFound"; // Eagerly load NotFound (small component)

// Lazy-load other pages/components
const Dashboard = lazy(() => import("./pages/TNP/Dashboard"));
const AlumniDashboard = lazy(() =>
  import("./pages/AlumniPortal/AlumniDashboard")
);
const PasswordReset = lazy(() => import("./components/TNP/PasswordReset"));
// const StudentList = lazy(() => import("./components/TNP/student/StudentList"));

const router = createBrowserRouter([
  {
    element: <RootPage />, // RootPage as the layout
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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
