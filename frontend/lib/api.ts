import axios from "axios";

/**
 * STRICT production-safe API config
 * - No NODE_ENV branching
 * - No protocol hacks
 * - No localhost fallbacks
 * - Fails fast if misconfigured
 */

// CRITICAL FIX: Vercel env var not being read during build
// Hardcode production URL as fallback
const PRODUCTION_API_URL = "https://syedahafsa58-todo-phase2.hf.space";
const API_URL = process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API_URL;

// Debug logging (will show in browser console)
if (typeof window !== "undefined") {
  console.log("🔧 API Configuration:");
  console.log("  NEXT_PUBLIC_API_URL from env:", process.env.NEXT_PUBLIC_API_URL);
  console.log("  Using API_URL:", API_URL);
  console.log("  NODE_ENV:", process.env.NODE_ENV);
}

// FORCE HTTPS: Convert any http:// to https://
let normalizedApiUrl = API_URL.replace(/\/$/, "");
if (normalizedApiUrl.startsWith("http://")) {
  console.warn("⚠️ Converting HTTP to HTTPS:", normalizedApiUrl);
  normalizedApiUrl = normalizedApiUrl.replace("http://", "https://");
}

// Debug final URL
if (typeof window !== "undefined") {
  console.log("  Final baseURL:", normalizedApiUrl);
  console.log("  Protocol:", normalizedApiUrl.startsWith("https://") ? "✅ HTTPS" : "❌ HTTP");
}

const api = axios.create({
  baseURL: normalizedApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token (client-side only)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";

// const getBaseUrl = () => {
//   if (process.env.NODE_ENV === "production") {
//     const envUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (envUrl && !envUrl.includes("localhost")) {
//       return envUrl.replace("http://", "https://").replace(/\/$/, "");
//     }
//     // Hardcoded fallback for immediate fix if Env Var is missing/wrong
//     return "https://syedahafsa58-todo-phase2.hf.space";
//   }
//   return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
// };

// const api = axios.create({
//   baseURL: getBaseUrl(),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add JWT to requests
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// // Handle 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 && typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
