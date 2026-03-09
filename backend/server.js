const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// ---------------------
// API Routes
// ---------------------
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/users", require("./routes/users"));

// Health check route
app.get("/api", (req, res) => {
  res.send("✅ SpendWise API is running...");
});

// ---------------------
// Serve React Frontend
// ---------------------

// Path to frontend build
const frontendPath = path.join(__dirname, "../frontend/build");

// Serve static files
app.use(express.static(frontendPath));

// React Router catch-all
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------------------

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});