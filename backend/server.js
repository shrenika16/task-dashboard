const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");

// middleware
app.use(express.json());

// routes
app.use("/tasks",taskRoutes);

app.listen(5000,()=>{
console.log("Server running on port 5000");
});