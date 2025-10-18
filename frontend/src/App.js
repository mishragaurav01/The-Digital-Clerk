

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Home from "./pages/Home";
// import EstampForm from "./pages/EstampForm";
// // import Login from "./pages/login";
// // import SignUp from "./pages/signUp";
// import LawyerPanel from "./pages/lawyerPanel";
// import ProtectedRoute from "./routes/protectedRoute";
// import EstampDetails from "./pages/estampDetails";

import LandingPage from "./Pages/Customer/LandingPage";
import MyOrder from "./Pages/Customer/MyOrder";
import Form from "./Pages/Customer/Form";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";


function AppRouter() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!token || !user) {
  //     navigate("/login");
  //   } else if (user.role === "lawyer") {
  //     navigate("/lawyer");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/orders" element={<MyOrder />} />
      <Route path="/eStamp" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {" "}
      {/* Public Routes /} <Route path="/login" element={<Login />} /> <Route path="/register" element={<SignUp />} /> {/ Protected Routes */}{" "}
      {/* <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            {" "}
            <LandingPage />{" "}
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/form"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            {" "}
            <EstampForm />{" "}
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/lawyer"
        element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            {" "}
            <LawyerPanel />{" "}
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/estamp/:id"
        element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            {" "}
            <EstampDetails />{" "}
          </ProtectedRoute>
        } */}
      {/* />{" "} */}
    </Routes>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      {" "}
      <AppRouter />{" "}
    </BrowserRouter>
  );
}
