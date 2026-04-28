const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const authMiddleware = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", authMiddleware, async (req,res)=>{
try{
const tasks = await Task.find({
userId: req.user.userId
});
res.json(tasks);
}catch(error){
res.status(500).json({message:error.message});
}
});

// ADD task
router.post("/", authMiddleware, async (req,res)=>{
try{
const task = new Task({
...req.body,
userId: req.user.userId
});
const savedTask = await task.save();
res.json({task:savedTask});
}catch(error){
res.status(500).json({message:error.message});
}
});

// UPDATE task
router.put("/:id", authMiddleware, async (req,res)=>{
try{
const updatedTask = await Task.findOneAndUpdate(
{
_id: req.params.id,
userId: req.user.userId
},
req.body,
{new:true}
);
res.json({task:updatedTask});
}catch(error){
res.status(500).json({message:error.message});
}
});

// DELETE task
router.delete("/:id", authMiddleware, async (req,res)=>{
try{
await Task.findOneAndDelete({
_id: req.params.id,
userId: req.user.userId
});
res.json({message:"Task deleted"});
}catch(error){
res.status(500).json({message:error.message});
}
});

module.exports = router;