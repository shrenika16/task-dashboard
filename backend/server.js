const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Server Start
app.listen(5000, () => {
console.log("Server running on port 5000");
});