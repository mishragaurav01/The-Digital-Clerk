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
import LawyerLayout from './Components/lawyerLayout'
import AdminLayout from './Components/adminLayout'
// import CustomerHeader from './Components/customerLayout'

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



{/* Header for Lawyer panel */}
      {/* 🧑‍⚖️ Lawyer Routes */}
      <Route element={<LawyerLayout />}>
      <Route
        path="/lawyer"
        element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            <LawyerPanel />
          </ProtectedRoute>
        }
      />
      </Route>

      {/* header for admin panel */}

      {/* 🧑‍💼 Admin Routes */}
      <Route element={<AdminLayout />}>
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
      </Route>
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
