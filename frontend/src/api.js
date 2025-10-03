import axios from "axios";

// ✅ Since frontend + backend are deployed together on Render,
//    we can just use relative "/api"
const API = axios.create({
  baseURL: "/api",
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
      // ignore JSON parse errors
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
