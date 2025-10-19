import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Customer/LandingPage";
import MyOrder from "./Pages/Customer/MyOrder";
import Form from "./Pages/Customer/Form";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Admin/Dashboard";
import Request from "./Pages/Admin/Request";
import Review from "./Pages/Admin/Review";
import LawyerPanel from "./Pages/Lawyer/LawyerPanel";
import ProtectedRoute from "./routes/ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {/* 🧍 Customer Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <LandingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <MyOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eStamp"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Form />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍⚖️ Lawyer Routes */}
      <Route
        path="/lawyer"
        element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            <LawyerPanel />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍💼 Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-request"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Request />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lawyer-review"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Review />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
