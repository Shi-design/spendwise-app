// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api", // uses proxy in package.json to forward to backend (http://localhost:5001)
});

// Attach JWT token (if present) to every request
API.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (e) {
      // ignore parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Named exports for convenience
export const getExpenses = () => API.get("/expenses");
export const addExpense = (data) => API.post("/expenses", data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

// default export also available if you prefer api.post(...)
export default API;
