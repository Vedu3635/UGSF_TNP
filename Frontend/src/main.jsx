import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Import App component
import { AuthProvider } from "./pages/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap only AuthProvider */}
      <App /> {/* ✅ Do not wrap with BrowserRouter */}
    </AuthProvider>
  </React.StrictMode>
);
