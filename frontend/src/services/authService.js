// src/services/authService.js
import API_BASE from "../config/api";

const API_URL = `${API_BASE}/auth`;

// Register (Sign Up)
export const signUp = async (name, email, password, phone) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to sign up");

    // Save token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.newUser));

    return data;
  } catch (error) {
    throw error;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to login");

    // Save token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));



    console.log(data.user.role)

    return data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
