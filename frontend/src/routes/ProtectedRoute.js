import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, getToken } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();
  const user = getUser();

  // ⛔ If not logged in, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If role is not allowed, redirect based on role
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "lawyer":
        return <Navigate to="/lawyer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // ✅ Authorized
  return children;
}

export default ProtectedRoute;
