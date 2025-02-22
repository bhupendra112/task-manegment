const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Database connection
require("./conn/conn");

// CORS configuration
app.use(cors({
    origin: 'https://task-manegment-1.onrender.com',
    credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require("./Router/user");
const taskRouter = require("./Router/task");

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRouter);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

