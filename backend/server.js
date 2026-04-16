const express = require("express");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/tasks", taskRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
.then(()=>{
    console.log("MongoDB connected");
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err=>console.log(err));