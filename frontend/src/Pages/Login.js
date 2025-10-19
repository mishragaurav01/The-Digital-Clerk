import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    try {
      await login(email, password);
      const user = getUser()
      alert("Login successful!");
      if(user?.role === "admin"){
        navigate("/admin");
      }else if(user?.role === "lawyer"){
        navigate("/lawyer");
      }else{
        navigate("/"); // ✅ Redirect to home after successful login
      }
    } catch (error) {
      console.error("Login Error:", error)
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #60a5fa, #3b82f6)" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1e40af" }}>
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.25rem" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.25rem" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#6b7280" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#2563eb", fontWeight: "600" }}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
