const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");

// GET all tasks
router.get("/", async (req,res)=>{
try{
const tasks = await Task.find();
res.json(tasks);
}catch(error){
res.status(500).json({message:error.message});
}
});

// ADD task
router.post("/", async (req,res)=>{
try{
const task = new Task(req.body);
const savedTask = await task.save();
res.json({task:savedTask});
}catch(error){
res.status(500).json({message:error.message});
}
});

// UPDATE task
router.put("/:id", async (req,res)=>{
try{
const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);
res.json({task:updatedTask});
}catch(error){
res.status(500).json({message:error.message});
}
});

// DELETE task
router.delete("/:id", async (req,res)=>{
try{
await Task.findByIdAndDelete(req.params.id);
res.json({message:"Task deleted"});
}catch(error){
res.status(500).json({message:error.message});
}
});

module.exports = router;