const express = require("express");

const app = express();

const PORT = 5000;

// middleware
app.use(express.json());

// dummy tasks
let tasks = [
{
id:1,
title:"Learn React",
status:"Pending"
},
{
id:2,
title:"Build Task App",
status:"Completed"
}
];

// GET /
app.get("/",(req,res)=>{
res.json({
message:"Welcome to Task Dashboard API"
})
})

// GET /tasks
app.get("/tasks",(req,res)=>{
res.json(tasks)
})

// POST /tasks
app.post("/tasks",(req,res)=>{

const newTask = {
id:tasks.length + 1,
title:req.body.title,
status:"Pending"
}

tasks.push(newTask)

res.json({
message:"Task added successfully",
task:newTask
})

})

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})