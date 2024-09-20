import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import RootPage from "./pages/RootPage";
import { AuthProvider, useAuth } from "./pages/AuthContext";

// Define routes using createBrowserRouter
const AppRouter = () => {
  const { login } = useAuth(); // Get the login function from AuthContext

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <RootPage />
        </PrivateRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/login1",
      element: <Login onLogin={login} />, // Pass onLogin here
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
