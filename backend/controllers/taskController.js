const Task = require("../models/TaskModel");

// GET /tasks
exports.getTasks = async (req,res)=>{

try{

const tasks = await Task.find();

res.json(tasks);

}catch(error){

res.status(500).json({message:error.message});

}

};


// POST /tasks
exports.addTask = async (req,res)=>{

try{

const newTask = new Task({

title:req.body.title,
description:req.body.description,
status:req.body.status

});

const savedTask = await newTask.save();

res.json({
message:"Task added",
task:savedTask
});

}catch(error){

res.status(500).json({message:error.message});

}

};
// UPDATE task
exports.updateTask = async (req,res)=>{

try{

const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

if(!updatedTask){
return res.status(404).json({message:"Task not found"});
}

res.json({
message:"Task updated",
task:updatedTask
});

}catch(error){

res.status(500).json({message:error.message});

}

};
// DELETE task
exports.deleteTask = async (req,res)=>{

try{

const deletedTask = await Task.findByIdAndDelete(req.params.id);

if(!deletedTask){
return res.status(404).json({message:"Task not found"});
}

res.json({
message:"Task deleted"
});

}catch(error){

res.status(500).json({message:error.message});

}

};