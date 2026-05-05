const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req,res,next)=>{
console.log(req.method, req.url);
next();
});

// Database Connection
connectDB();

// Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Global Error Handler
app.use(errorHandler);

// Server Start
app.listen(5000, () => {
console.log("Server running on port 5000");
});