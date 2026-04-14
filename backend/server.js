const express = require("express");
const mongoose = require("mongoose");

const app = express();

const taskRoutes = require("./routes/taskRoutes");

// middleware
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// routes
app.use("/tasks",taskRoutes);

// server
app.listen(5000,()=>{
console.log("Server running on port 5000");
});