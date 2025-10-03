const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // DB connection file

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// ✅ CORS setup (allow only your Netlify frontend)
app.use(cors({
  origin: "https://classy-biscochitos-a43750.netlify.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/users', require('./routes/users'));

// ✅ Base route for Render health check
app.get('/', (req, res) => {
  res.send('SpendWise API is running... ✅');
});

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
