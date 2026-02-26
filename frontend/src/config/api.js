// ================================================
// 🌐 Centralized API Configuration
// ================================================
// All API URLs are defined here. Update this single file
// when moving to production or changing the backend URL.
//
// In production, set the REACT_APP_API_URL environment variable
// in your .env file:
//   REACT_APP_API_URL=https://your-production-domain.com/api
// ================================================

const isProd = process.env.NODE_ENV === "production";

// Use relative paths in production to route through a reverse proxy (like Nginx).
// This prevents exposing backend ports and IPs directly during frontend requests.
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (isProd ? "/api" : "http://localhost:5001/api");

// Base URL for serving uploaded files (static files)
const UPLOADS_BASE =
  process.env.REACT_APP_UPLOADS_URL || (isProd ? "" : "http://localhost:5001");

/**
 * Returns the full URL for an uploaded file.
 * Usage: getUploadUrl("myfile.pdf") → "http://localhost:5000/uploads/myfile.pdf"
 */
export const getUploadUrl = (filename) => {
  if (!filename) return null;
  return `${UPLOADS_BASE}/uploads/${filename}`;
};

export { API_BASE };
export default API_BASE;
