import React, { useState } from "react";
import { signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(formData.name, formData.email, formData.password, formData.phone);
      alert("Signup successful!");
      navigate("/"); // ✅ Redirect to login after successful signup
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#4c1d95",
          }}
        >
          Create Account ✨
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name" // ✅ added missing name attribute
              value={formData.name}
              onChange={handleChange}
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
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}" // ✅ ensures exactly 10 digits
              maxLength="10"
              placeholder="Enter 10-digit phone number"
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
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email" // ✅ added missing name attribute
              value={formData.email}
              onChange={handleChange}
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
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password" // ✅ added missing name attribute
              value={formData.password}
              onChange={handleChange}
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
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "0.75rem",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6d28d9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7c3aed")}
          >
            Sign Up
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#7c3aed",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
