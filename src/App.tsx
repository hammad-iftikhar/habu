import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/routing/UnauthenticatedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        {/* Unauthenticated Routes */}
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <SignUp />
            </UnauthenticatedRoute>
          }
        />

        {/* Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          }
        />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
