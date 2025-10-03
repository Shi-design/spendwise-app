import axios from "axios";

// ✅ Use Netlify env var (recommended), fallback to your Render backend
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://spendwise-app-0wdp.onrender.com/api",
});

// ✅ Attach JWT token (if present) to every request
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
      // Ignore JSON parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Expense routes
export const getExpenses = () => API.get("/expenses");
export const addExpense = (data) => API.post("/expenses", data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

// ✅ User routes
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

export default API;
