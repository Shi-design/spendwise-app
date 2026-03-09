import axios from "axios";

// Backend URL
const API = axios.create({
  baseURL: "https://spendwise-backend.onrender.com/api",
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Error attaching token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Expense APIs
export const getExpenses = () => API.get("/expenses");

export const addExpense = (data) => API.post("/expenses", data);

export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

// User APIs
export const registerUser = (data) => API.post("/users/register", data);

export const loginUser = (data) => API.post("/users/login", data);

export default API;