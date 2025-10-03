const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); // your MongoDB connection

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// Optional CORS (if you later want external clients)
app.use(cors());

// API routes
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/users", require("./routes/users"));

// Health check route
app.get("/api", (req, res) => {
  res.send("✅ SpendWise API is running...");
});

// ---------------------
// Serve React frontend
// ---------------------
const __dirname1 = path.resolve();

// Serve static files from frontend build
app.use(express.static(path.join(__dirname1, "/frontend/build")));

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
});

// ---------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
